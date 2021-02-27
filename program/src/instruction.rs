#![cfg(feature = "program")]

use crate::error::AppError;
use solana_sdk::program_error::ProgramError;
use std::{char, convert::TryInto};

#[derive(Clone, Debug, PartialEq)]
pub enum AppInstruction {
	SetUserData { name: String },
}

impl AppInstruction {
	pub fn unpack(instruction: &[u8]) -> Result<Self, ProgramError> {
		let (&tag, rest) = instruction
			.split_first()
			.ok_or(AppError::InvalidInstruction)?;
		Ok(match tag {
			// Set user data
			0 => {
				// Extract name from instruction
				let vec_name: Vec<_> = rest
					.get(..(55 * 4))
					.unwrap()
					.chunks(4)
					.map(|slice| slice.try_into().unwrap())
					.map(|slice| u8::from_le_bytes(slice))
					.collect();
				Self::SetUserData {
					name: "mfbz".to_string(), // String::from_utf8(vec_name).unwrap()
				}
			}
			_ => return Err(AppError::InvalidInstruction.into()),
		})
	}
}
