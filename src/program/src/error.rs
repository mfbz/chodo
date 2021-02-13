#![cfg(feature = "program")]

use num_derive::FromPrimitive as DriveFromPrimitive;
use num_traits::FromPrimitive;
use solana_sdk::{
  decode_error::DecodeError,
  info,
  program_error::{PrintProgramError, ProgramError},
};
use thiserror::Error;

/// Re-exporting PrintProgramError as PrintAppError for convention
pub use solana_sdk::program_error::PrintProgramError as PrintAppError;

/// Errors that may be returned by the app program.
#[derive(Clone, Debug, Eq, Error, DriveFromPrimitive, PartialEq)]
pub enum AppError {
  #[error("Invalid instruction")]
  InvalidInstruction,
  #[error("Incorrect program id")]
  IncorrectProgramId,
  #[error("Operation overflowed")]
  Overflow,
}

impl From<AppError> for ProgramError {
  fn from(e: AppError) -> Self {
    ProgramError::Custom(e as u32)
  }
}

impl<T> DecodeError<T> for AppError {
  fn type_of() -> &'static str {
    "AppError"
  }
}

impl PrintProgramError for AppError {
  fn print<E>(&self)
  where
    E: 'static + std::error::Error + DecodeError<E> + PrintProgramError + FromPrimitive,
  {
    match self {
      AppError::InvalidInstruction => info!("Error: Invalid instruction"),
      AppError::IncorrectProgramId => info!("Error: Incorrect program id"),
      AppError::Overflow => info!("Error: Operation overflowed"),
    }
  }
}
