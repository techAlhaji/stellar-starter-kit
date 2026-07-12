use soroban_sdk::{symbol_short, Address, Env, Symbol};

const OWNER_KEY: Symbol = symbol_short!("owner");
const COUNT_KEY: Symbol = symbol_short!("count");

// Threshold/lifetime for TTL extension
const INSTANCE_BUMP_LIMIT: u32 = 100_000; // ~5 days in ledgers
const INSTANCE_THRESHOLD: u32 = 10_000; // ~12 hours in ledgers

pub fn get_owner(env: &Env) -> Option<Address> {
    env.storage().instance().get(&OWNER_KEY)
}

pub fn set_owner(env: &Env, owner: &Address) {
    env.storage().instance().set(&OWNER_KEY, owner);
    extend_instance_ttl(env);
}

pub fn has_owner(env: &Env) -> bool {
    env.storage().instance().has(&OWNER_KEY)
}

pub fn get_count(env: &Env) -> u32 {
    env.storage().instance().get(&COUNT_KEY).unwrap_or(0)
}

pub fn set_count(env: &Env, count: u32) {
    env.storage().instance().set(&COUNT_KEY, &count);
    extend_instance_ttl(env);
}

pub fn extend_instance_ttl(env: &Env) {
    env.storage().instance().extend_ttl(INSTANCE_THRESHOLD, INSTANCE_BUMP_LIMIT);
}
