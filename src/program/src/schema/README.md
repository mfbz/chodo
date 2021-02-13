# Schema

Recall that a Solana program did not has storage by itself.

To store information, you need to do that on separate accounts, then leave account permission to the program.

Because the rigid form of data, it must be fixed size, stored in these accounts, we may need several accounts to store different types of data.

In Schema folder, we can easily define and manage all account structures by schemata.
For example, dummy.rs is a typical schema is a hello-world program.

```rust
pub struct Dummy {
  pub amount: u32,
  pub toggle: bool,
}
```

The Dummy struct has 2 fields namely amount and toggle that program uses to understand the serialized data.
