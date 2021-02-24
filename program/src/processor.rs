#![cfg(feature = "program")]

use crate::error::AppError;
use crate::instruction::AppInstruction;
use crate::state::user::User;
use crate::state::utils::serdes::Serdes;

use borsh::BorshDeserialize;
use solana_sdk::{
	account_info::{next_account_info, AccountInfo},
	entrypoint::ProgramResult,
	msg,
	program_error::ProgramError,
	pubkey::Pubkey,
};

pub struct Processor {}

impl Processor {
	pub fn process(
		program_id: &Pubkey,
		accounts: &[AccountInfo],
		instruction_data: &[u8],
	) -> ProgramResult {
		// Unpack the data passed in the transaction deserializing it via implemented Serdes traits
		let instruction = AppInstruction::try_from_slice(&instruction_data)
			.map_err(|_| ProgramError::InvalidInstructionData)?;

		// Create an iterator over input accounts array
		let accounts_iter = &mut accounts.iter();

		// Do different program actions depending on the passed instruction
		match instruction {
			AppInstruction::CreateUser { name } => {
				// Get signer account from iterator and do checks
				let signer_account = next_account_info(accounts_iter)?;
				if !signer_account.is_signer {
					return Err(ProgramError::MissingRequiredSignature);
				}

				// Get user account created deterministically from signer account
				let user_account = next_account_info(accounts_iter)?;

				// Get expected account knowning how to create from seed to verify the one i got as data is the correct one and do checks
				let expected_user_account_pk = User::create_with_seed(signer_account.key, &program_id)?;
				if expected_user_account_pk != *user_account.key {
					return Err(AppError::AccountNotDeterministic.into());
				}
				if user_account.owner != program_id {
					return Err(AppError::IncorrectProgramId.into());
				}
				if user_account.try_data_len().unwrap() < User::MIN_SPACE {
					return Err(ProgramError::AccountDataTooSmall);
				}

				msg!(name);

				// Create a new object from User constructor to initialize a new user
				let out_user_account_data = User { name };
				// Get a mutable reference of current user_account data
				let mut user_account_data = user_account.try_borrow_mut_data()?;
				// Pack current modified user data to user account borrowed data to save it
				out_user_account_data.pack(&mut user_account_data);

				Ok(())
			}
		}
	}
}
