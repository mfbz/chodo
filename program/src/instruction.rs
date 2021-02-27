#![cfg(feature = "program")]

use crate::error::AppError;
use solana_sdk::program_error::ProgramError;
use std::{char, convert::TryInto};

#[derive(Clone, Debug, PartialEq)]
pub enum AppInstruction {
	SetUserData { name: String, premium: bool },
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
				let name_s: String = rest
					.get(..(55 * 4))
					.unwrap()
					.chunks(4)
					.map(|slice| String::from_utf8([slice[0]].to_vec()).unwrap())
					.collect();
				// Extract premium
				let premium_b = match rest.get((55 * 4)..(55 * 4 + 1)).ok_or(AppError::InvalidInstruction)? {
          [0] => false,
          [1] => true,
          _ => return Err(ProgramError::InvalidAccountData),
        };

				Self::SetUserData {
					name: name_s,
					premium: premium_b
				}
			}
			_ => return Err(AppError::InvalidInstruction.into()),
		})
	}
}
