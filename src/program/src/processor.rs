#![cfg(feature = "program")]

use crate::error::AppError;
use crate::instruction::AppInstruction;
use crate::schema::dummy::Dummy;
use solana_sdk::{
	account_info::{next_account_info, AccountInfo},
	entrypoint::ProgramResult,
	info,
	program_pack::Pack,
	pubkey::Pubkey,
};

/*
 * After taking serialized data from Entrypoint.rs, all computation will be executed in Processor.rs.
 * You may remember that all the data is serialized. Therefore, to work on and then store the data,
 * we have to define methods to "unpack" and "pack" them, which is the main purpose of Instruction.rs.
 * First, Processor.rs passes instruction_data to Instruction.rs to unpack it and then get parameters from the return.
 * Next, depend on the instruction type, Processor.rs will decide which function would be called to handle the data.
 * Finally, return Ok or Error as results.
*/

pub struct Processor {}

impl Processor {
	pub fn process(
		program_id: &Pubkey,
		accounts: &[AccountInfo],
		instruction_data: &[u8],
	) -> ProgramResult {
		// Unpack the data passed in the transaction deserializing it.
		let instruction = AppInstruction::unpack(instruction_data)?;
		// Do different program actions depending on the passed instruction
		match instruction {
			AppInstruction::SayHello { amount, toggle } => {
				info!("Calling SayHello function");
				let accounts_iter = &mut accounts.iter();
				let account = next_account_info(accounts_iter)?;
				if account.owner != program_id {
					return Err(AppError::IncorrectProgramId.into());
				}
				let mut data = Dummy::unpack(&account.data.borrow())?;
				data.amount = data.amount.checked_add(amount).ok_or(AppError::Overflow)?;
				data.toggle = toggle;
				Dummy::pack(data, &mut account.data.borrow_mut())?;
				Ok(())
			}
		}
	}
}
