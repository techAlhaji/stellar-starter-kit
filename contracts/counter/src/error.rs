use soroban_sdk::contracterror;

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum CounterError {
    AlreadyInitialized = 1,
    NotInitialized = 2,
    Underflow = 3,
    Overflow = 4,
}
