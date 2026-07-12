use soroban_sdk::{symbol_short, Address, Env, Symbol};

const COUNTER_TOPIC: Symbol = symbol_short!("counter");

pub fn emit_initialize(env: &Env, owner: &Address) {
    env.events().publish((COUNTER_TOPIC, symbol_short!("init")), owner);
}

pub fn emit_increment(env: &Env, count: u32) {
    env.events().publish((COUNTER_TOPIC, symbol_short!("incr")), count);
}

pub fn emit_decrement(env: &Env, count: u32) {
    env.events().publish((COUNTER_TOPIC, symbol_short!("decr")), count);
}

pub fn emit_reset(env: &Env, owner: &Address) {
    env.events().publish((COUNTER_TOPIC, symbol_short!("reset")), owner);
}
