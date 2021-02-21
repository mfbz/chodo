#![cfg(feature = "program")]

use num_derive::FromPrimitive as DriveFromPrimitive;
use num_traits::FromPrimitive;
use solana_sdk::{decode_error::DecodeError, program_error::ProgramError};
use thiserror::Error;

/// Re-exporting PrintProgramError as PrintAppError for convention
pub use solana_sdk::program_error::PrintProgramError as PrintAppError;

/// Errors that may be returned by the app program
#[derive(Clone, Debug, Eq, Error, DriveFromPrimitive, PartialEq)]
pub enum AppError {
	#[error("Invalid instruction")]
	InvalidInstruction,

	#[error("Incorrect program id")]
	IncorrectProgramId,

	#[error("Account not generated deterministically")]
	AccountNotDeterministic,
}

impl From<AppError> for ProgramError {
	fn from(e: AppError) -> Self {
		ProgramError::Custom(e as u32)
	}
}

impl<T> DecodeError<T> for AppError {
	fn type_of() -> &'static str {
		"App Error"
	}
}
