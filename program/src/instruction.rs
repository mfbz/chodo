#![cfg(feature = "program")]

use crate::error::AppError;
use crate::schema::user_data::vec_to_array_55;
use solana_sdk::program_error::ProgramError;
use std::{char, convert::TryInto};

#[derive(Clone, Debug, PartialEq)]
pub enum AppInstruction {
	SetUserData { name: [char; 55] },
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
					.map(|slice| u32::from_le_bytes(slice))
					.map(|slice| char::from_u32(slice).unwrap())
					.collect();
				Self::SetUserData {
					name: vec_to_array_55(vec_name),
				}
			}
			_ => return Err(AppError::InvalidInstruction.into()),
		})
	}
}
