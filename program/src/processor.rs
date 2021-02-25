#![cfg(feature = "program")]

use crate::{error::AppError, instruction::AppInstruction, state::UserData};
use num_traits::FromPrimitive;
use solana_program::{
	account_info::{next_account_info, AccountInfo},
	decode_error::DecodeError,
	entrypoint::ProgramResult,
	msg,
	program_error::{PrintProgramError, ProgramError},
	program_option::COption,
	program_pack::{IsCreated, Pack},
	pubkey::Pubkey,
	sysvar::{rent::Rent, Sysvar},
};

/// Program state handler.
pub struct Processor {}

impl Processor {
	/// Processes an [Instruction](enum.Instruction.html).
	pub fn process(program_id: &Pubkey, accounts: &[AccountInfo], input: &[u8]) -> ProgramResult {
		// Extract the instruction by using AppInstruction unpack fn on input byte array
		let instruction = AppInstruction::unpack(input)?;

		// Depending on returned enum process the correct instruction
		match instruction {
			AppInstruction::SetUserData { name } => {
				// Get signer account from iterator and do checks
				let signer_account = next_account_info(accounts_iter)?;
				if !signer_account.is_signer {
					return Err(ProgramError::MissingRequiredSignature);
				}

				// Get user account created deterministically from signer account
				let user_account = next_account_info(accounts_iter)?;

				// Get expected account knowning how to create from seed to verify the one i got as data is the correct one and do checks
				// TODO!!!!! CREATE WITH SEED FROM WHAT?
				let expected_user_account_pk = UserData::create_with_seed(signer_account.key, &program_id)?;
				if expected_user_account_pk != *user_account.key {
					return Err(AppError::AccountNotDeterministic.into());
				}
				if user_account.owner != program_id {
					return Err(AppError::IncorrectProgramId.into());
				}
				if user_account.try_data_len().unwrap() < UserData::LEN {
					return Err(ProgramError::AccountDataTooSmall);
				}

				msg!(name);

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
