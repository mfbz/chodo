#![cfg(feature = "program")]

use crate::error::AppError;
use solana_sdk::program_error::ProgramError;
use std::mem::size_of;
use std::str;

/// Instructions supported by the App program.
#[derive(Clone, Debug, PartialEq)]
pub enum AppInstruction {
	/// 0. `[signer]` The wallet account that is signer of the transaction
	/// 1. `[writable]` The user account created from signer account with seed to be updated with data
	SetUserData { name: String },
}

impl AppInstruction {
	/// Unpacks a byte buffer into a [AppInstruction](enum.AppInstruction.html).
	pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
		// Get the tag from input byte buffer and separate it from the rest
		let (&tag, rest) = input.split_first().ok_or(AppError::InvalidInstruction)?;

		// Execute a method depending on the passed tag
		Ok(match tag {
			0 => {
				// Extract data part by part and leave the rest for subsequent extractions
				// 55 because it's the length of name data
				let (nameByteArr, rest) = rest.split_at(55);
				// Try conversion of input data to string otherwise trigger error
				let name = str::from_utf8(&nameByteArr).unwrap();

				// Return Create user enum value
				return Self::SetUserData { name };
			}
			_ => {
				return Err(AppError::InvalidInstruction.into());
			}
		})
	}

	/// Packs a [AppInstruction](enum.AppInstruction.html) into a byte buffer.
	pub fn pack(&self) -> Vec<u8> {
		// Convert app instruction to a buffer
		let mut buf = Vec::with_capacity(size_of::<Self>());

		// Pack the instruction depending on data
		match self {
			&Self::SetUserData { name } => {
				// I have to put all the instruction data into the buffer
				// Push the tag of the instruction as first byte
				buf.push(0);
				// Push name variable
				buf.extend_from_slice(&name.as_bytes());
			}
		};

		// Return updated buffer
		return buf;
	}
}
