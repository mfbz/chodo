#![cfg(feature = "program")]
#![cfg(not(feature = "no-entrypoint"))]

use crate::{error::AppError, processor::Processor};
use solana_sdk::{
	account_info::AccountInfo, entrypoint_deprecated, entrypoint_deprecated::ProgramResult,
	pubkey::Pubkey,
};

entrypoint_deprecated!(process_instruction);

fn process_instruction(
	program_id: &Pubkey,
	accounts: &[AccountInfo],
	instruction_data: &[u8],
) -> ProgramResult {
	if let Err(error) = Processor::process(program_id, accounts, instruction_data) {
		// catch the error so we can print it
		error.print::<AppError>();
		return Err(error);
	}
	return Ok(());
}
