#![cfg(feature = "program")]

use crate::error::AppError;
use crate::instruction::AppInstruction;
use crate::schema::user_data::UserData;
use solana_sdk::{
	account_info::{next_account_info, AccountInfo},
	entrypoint::ProgramResult,
	program_pack::{IsInitialized, Pack},
	pubkey::Pubkey,
};

pub struct Processor {}

impl Processor {
	pub fn process(
		program_id: &Pubkey,
		accounts: &[AccountInfo],
		instruction_data: &[u8],
	) -> ProgramResult {
		let instruction = AppInstruction::unpack(instruction_data)?;
		match instruction {
			// Set user data, code 0
			AppInstruction::SetUserData {
				name
			} => {
				let accounts_iter = &mut accounts.iter();

				let wallet_account = next_account_info(accounts_iter)?;
				let user_account = next_account_info(accounts_iter)?;

				let mut data = UserData::unpack(&user_account.data.borrow())?;
        data.name = name;
        UserData::pack(data, &mut user_account.data.borrow_mut())?;

				Ok(())
			}
		}
	}
}
