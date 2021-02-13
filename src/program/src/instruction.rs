#![cfg(feature = "program")]

use crate::error::AppError;
use solana_sdk::program_error::ProgramError;
use std::convert::TryInto;

/*
 * On instruction data, this component will parse corresponding parameters.
 * The first byte of the instruction data always represents the instruction code.
 * For example in hello-world program, if the first byte is 0, then it should parse the parameters for sayHello function.
*/

#[derive(Clone, Debug, PartialEq)]
pub enum AppInstruction {
	SayHello { amount: u32, toggle: bool },
}

impl AppInstruction {
	// Unpack the data from its serialized form
	pub fn unpack(instruction: &[u8]) -> Result<Self, ProgramError> {
		// Destructure instruction data in a tuple and trigger an upper level error if it cannot be done
		let (&tag, rest) = instruction
			.split_first()
			.ok_or(AppError::InvalidInstruction)?;

		// The instructions has been unpacked, use the passed tag to decide what action object to return
		Ok(match tag {
			0 => {
				let amount = rest
					.get(..4)
					.and_then(|slice| slice.try_into().ok())
					.map(u32::from_le_bytes)
					.ok_or(AppError::InvalidInstruction)?;
				let toggle = match rest.get(4..5).ok_or(AppError::InvalidInstruction)? {
					[0] => false,
					[1] => true,
					_ => return Err(ProgramError::InvalidAccountData),
				};
				Self::SayHello { amount, toggle }
			}
			_ => return Err(AppError::InvalidInstruction.into()),
		})
	}
}
