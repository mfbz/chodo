#![cfg(feature = "program")]

use crate::error::AppError;
use crate::instruction::AppInstruction;
use crate::schema::{user_data::UserData, project_data::ProjectData, task_data::TaskData};
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
				name, premium
			} => {
				let accounts_iter = &mut accounts.iter();

				let wallet_account = next_account_info(accounts_iter)?;
				let user_account = next_account_info(accounts_iter)?;

				let mut data = UserData::unpack(&user_account.data.borrow())?;
        data.name = name;
				data.premium = premium;
        UserData::pack(data, &mut user_account.data.borrow_mut())?;

				Ok(())
			},
			// Set user data, code 1
			AppInstruction::SetProjectData {
				index, name
			} => {
				let accounts_iter = &mut accounts.iter();

				let wallet_account = next_account_info(accounts_iter)?;
				let user_account = next_account_info(accounts_iter)?;
				let project_account = next_account_info(accounts_iter)?;

				let mut data = ProjectData::unpack(&project_account.data.borrow())?;
				data.index = index;
        data.name = name;
        ProjectData::pack(data, &mut project_account.data.borrow_mut())?;

				Ok(())
			},
			// Set user data, code 2
			AppInstruction::SetTaskData {
				index, message, completed
			} => {
				let accounts_iter = &mut accounts.iter();

				let wallet_account = next_account_info(accounts_iter)?;
				let user_account = next_account_info(accounts_iter)?;
				let project_account = next_account_info(accounts_iter)?;
				let task_account = next_account_info(accounts_iter)?;

				let mut data = TaskData::unpack(&task_account.data.borrow())?;
				data.index = index;
        data.message = message;
				data.completed = completed;
        TaskData::pack(data, &mut task_account.data.borrow_mut())?;

				Ok(())
			}
		}
	}
}
