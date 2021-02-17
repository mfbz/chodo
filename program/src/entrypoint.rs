#![cfg(feature = "program")]
#![cfg(not(feature = "no-entrypoint"))]

use crate::{
	error::{AppError, PrintAppError},
	processor::Processor,
};
use solana_sdk::{
	account_info::AccountInfo, entrypoint_deprecated, entrypoint_deprecated::ProgramResult,
	pubkey::Pubkey,
};

/*
 * Entrypoint.rs
 * Every calls will be handled at the beginning right here.
 * Due to the simple mission and standardized code, we rarely need to modify this file.
 * This component is to pass program_is, accounts list, and instruction_data to Processor.rs,
 * which is all the thing it does.
*/

entrypoint_deprecated!(process_instruction);

fn process_instruction<'a>(
	program_id: &Pubkey,
	accounts: &'a [AccountInfo<'a>],
	instruction_data: &[u8],
) -> ProgramResult {
	// Call processor main function to handle the transaction
	if let Err(error) = Processor::process(program_id, accounts, instruction_data) {
		// If an error occurs trigger it and abort the program
		error.print::<AppError>();
		return Err(error);
	}

	// If everything went well return ok
	Ok(())
}
