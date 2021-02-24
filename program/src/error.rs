#![cfg(feature = "program")]

use num_derive::FromPrimitive;
use solana_sdk::{decode_error::DecodeError, program_error::ProgramError};
use thiserror::Error;

/// Errors that may be returned by the App program.
#[derive(Clone, Debug, Eq, Error, FromPrimitive, PartialEq)]
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
		return ProgramError::Custom(e as u32);
	}
}
impl<T> DecodeError<T> for AppError {
	fn type_of() -> &'static str {
		return "AppError";
	}
}
