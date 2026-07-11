#![cfg(test)]
use super::*;
use soroban_sdk::{testutils::Events, vec, Env, IntoVal, TryFromVal};

#[test]
fn test_counter() {
    let env = Env::default();
    let contract_id = env.register_contract(None, CounterContract);
    let client = CounterContractClient::new(&env, &contract_id);

    // Assert initial count is 0
    assert_eq!(client.get(), 0);

    // Test increment
    assert_eq!(client.increment(), 1);
    assert_eq!(client.get(), 1);

    assert_eq!(client.increment(), 2);
    assert_eq!(client.get(), 2);

    // Test decrement
    assert_eq!(client.decrement(), 1);
    assert_eq!(client.get(), 1);

    // Test reset
    assert_eq!(client.reset(), 0);
    assert_eq!(client.get(), 0);

    // Decrement from 0 should clamp to 0
    assert_eq!(client.decrement(), 0);
    assert_eq!(client.get(), 0);

    // Verify events are published
    let events = env.events().all();
    assert_eq!(events.len(), 5);

    // Check the last event (decrement to 0)
    let last_event = events.last().unwrap();
    assert_eq!(
        last_event.1,
        vec![
            &env,
            symbol_short!("counter").into_val(&env),
            symbol_short!("decrement").into_val(&env)
        ]
    );
    assert_eq!(u32::try_from_val(&env, &last_event.2).unwrap(), 0u32);
}
