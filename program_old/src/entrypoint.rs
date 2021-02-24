#![cfg(feature = "program")]
#![cfg(not(feature = "no-entrypoint"))]

use crate::processor::Processor;
use solana_sdk::{
	account_info::AccountInfo, entrypoint_deprecated, entrypoint_deprecated::ProgramResult,
	pubkey::Pubkey,
};

entrypoint_deprecated!(process_instruction);

fn process_instruction<'a>(
	program_id: &Pubkey,
	accounts: &'a [AccountInfo<'a>],
	instruction_data: &[u8],
) -> ProgramResult {
	// Call processor main function to handle the transaction
	return Processor::process(program_id, accounts, instruction_data);
}
