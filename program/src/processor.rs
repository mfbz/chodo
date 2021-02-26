#![cfg(feature = "program")]

use crate::{error::AppError, instruction::AppInstruction, state::UserData};
use solana_sdk::{
	account_info::{next_account_info, AccountInfo},
	entrypoint::ProgramResult,
	program_error::ProgramError,
	program_pack::Pack,
	pubkey::Pubkey,
};

/// Program state handler.
pub struct Processor {}

impl Processor {
	/// Processes an [Instruction](enum.Instruction.html).
	pub fn process(program_id: &Pubkey, accounts: &[AccountInfo], input: &[u8]) -> ProgramResult {
		// Extract the instruction by using AppInstruction unpack fn on input byte array
		let instruction = AppInstruction::unpack(input)?;
		// A utility to itearate on accounts array
		let accounts_iter = &mut accounts.iter();

		// Depending on returned enum process the correct instruction
		match instruction {
			AppInstruction::SetUserData { name } => {
				// Get wallet account that should be the signer and do checks
				let wallet_account = next_account_info(accounts_iter)?;
				if !wallet_account.is_signer {
					return Err(ProgramError::MissingRequiredSignature);
				}

				// Get user account created deterministically from signer account
				let user_account = next_account_info(accounts_iter)?;
				// Get expected account knowning how to create from seed to verify the one i got as data is the correct one and do checks
				let expected_user_account_pk = UserData::create_with_seed(wallet_account.key, &program_id)?;
				if expected_user_account_pk != *user_account.key {
					return Err(AppError::AccountNotDeterministic.into());
				}
				if user_account.owner != program_id {
					return Err(AppError::IncorrectProgramId.into());
				}

				// Create a new object from User constructor to initialize a new user
				let out_user_account_data = UserData { name };

				// Get a mutable reference of current user_account data to modify it
				let mut user_account_data = user_account.try_borrow_mut_data()?;
				// Pack current modified user data to user account borrowed data to save it
				out_user_account_data.pack(&mut user_account_data);

				return Ok(());
			}
		}
	}
}
