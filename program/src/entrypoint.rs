#![cfg(feature = "program")]
#![cfg(not(feature = "no-entrypoint"))]

use crate::processor::Processor;
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
	return Processor::process(program_id, accounts, instruction_data);
}
