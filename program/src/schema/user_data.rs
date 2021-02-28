#![cfg(feature = "program")]

use arrayref::{array_mut_ref, array_ref, array_refs, mut_array_refs};
use solana_sdk::{
	program_error::ProgramError,
	program_pack::{IsInitialized, Pack, Sealed},
};
use std::convert::TryInto;

// DOCS: Reac this for string encoding utf8
// https://doc.rust-lang.org/book/ch08-02-strings.html
// premium property is not used at the moment :)
#[derive(Clone, Debug, Default, PartialEq)]
pub struct UserData {
	pub name: String,
	pub premium: bool
}

impl Sealed for UserData {}

impl IsInitialized for UserData {
	fn is_initialized(&self) -> bool {
		true
	}
}

impl Pack for UserData {
	// Fixed length
	const LEN: usize = 55 * 4 + 1;
	// Unpack data from [u8] to the data struct
	fn unpack_from_slice(src: &[u8]) -> Result<Self, ProgramError> {
		let src = array_ref![src, 0, 55 * 4 + 1];
		let (name, premium) = array_refs![src, 55 * 4, 1];

		// here it's like 'mfbz' -> ['m', '', '', '', 'f', '', '', '', 'b', 'z']
		// From utf8 string that is with a max of 4 bytes but only need first one because it takes 1
		let name_s: String = name
			.chunks(4)
			.map(|slice| String::from_utf8([slice[0]].to_vec()).unwrap())
			.collect();
		let premium_b = match premium {
      [0] => false,
      [1] => true,
      _ => return Err(ProgramError::InvalidAccountData),
    };

		Ok(UserData {
			name: name_s,
			premium: premium_b
		})
	}
	// Pack data from the data struct to [u8]
	fn pack_into_slice(&self, dst: &mut [u8]) {
		let dst = array_mut_ref![dst, 0, 55 * 4 + 1];
		let (dst_name, dst_premium) = mut_array_refs![dst, 55 * 4, 1];

		// Destructure a reference of self to get data to be packed
		let UserData { name, premium } = self;

		// Counter to set the correct bytes inside dst_name
		pack_string_220(&name, dst_name);
		// Set premium value
		*dst_premium = match premium {
      true => [1],
      _ => [0],
    };
	}
}

// 220 is 55 * 4
fn pack_string_220(src: &String, dst: &mut [u8; 220]) {
    // utf8 strings no unicode no special things, only this
    let mut index = 0;
    for c in src.chars() {
        dst[index] = c.to_string().as_bytes()[0];
        // 4 in 4 because utf8 normal character takes only 1 byte
        index += 4;
    }
}
