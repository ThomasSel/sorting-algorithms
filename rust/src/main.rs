use rand::distributions::{Distribution, Uniform};
use std::time::{Duration, Instant};

// use sorting::*;

mod binary_tree;
mod insertion_sort;
mod merge_sort;
mod selection_sort;

const N: usize = 1000;
const NUM_TESTS: usize = 25;

fn main() {
    println!(
        "selection_sort: Avg Time (ms) {}",
        run_test(Box::new(selection_sort::copy)).as_micros() as f32 / 1000.0
    );
    println!(
        "insertion_sort: Avg Time (ms) {}",
        run_test(Box::new(insertion_sort::copy)).as_micros() as f32 / 1000.0
    );
    println!(
        "merge_sort: Avg Time (ms) {}",
        run_test(Box::new(merge_sort::copy)).as_micros() as f32 / 1000.0
    );
}

fn run_test(sorting_function: Box<dyn Fn(&[i32]) -> Vec<i32>>) -> Duration {
    let start = Instant::now();

    for _ in 0..NUM_TESTS {
        let arr = generate_random_vec(N);
        sorting_function(&arr);
    }

    return start.elapsed() / NUM_TESTS.try_into().unwrap();
}

fn generate_random_vec(n: usize) -> Vec<i32> {
    let mut arr: Vec<i32> = Vec::with_capacity(n);

    let mut rng = rand::thread_rng();
    let distrib: Uniform<i32> = Uniform::from(0..n.try_into().unwrap());
    for _ in 0..n {
        arr.push(distrib.sample(&mut rng));
    }

    return arr;
}
