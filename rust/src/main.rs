use rand::distributions::{Distribution, Uniform};
use std::time::{Duration, Instant};

use sorting::*;

const N: usize = 10000;
const NUM_TESTS: usize = 25;

enum SortingFunction {
    Slice(Box<dyn Fn(&[i32]) -> Vec<i32>>),
    MutVec(Box<dyn Fn(&mut Vec<i32>) -> Vec<i32>>),
}

fn main() {
    println!(
        "selection_sort: Avg Time (ms) {}",
        run_test(SortingFunction::MutVec(Box::new(selection_sort))).as_micros() as f32 / 1000.0
    );
    println!(
        "insertion_sort: Avg Time (ms) {}",
        run_test(SortingFunction::Slice(Box::new(insertion_sort))).as_micros() as f32 / 1000.0
    );
    println!(
        "merge_sort: Avg Time (ms) {}",
        run_test(SortingFunction::Slice(Box::new(merge_sort))).as_micros() as f32 / 1000.0
    );
}

fn run_test(sorting_function: SortingFunction) -> Duration {
    let start = Instant::now();

    for _ in 0..NUM_TESTS {
        match sorting_function {
            SortingFunction::Slice(ref sort) => {
                let arr = generate_random_vec(N);
                sort(&arr)
            }
            SortingFunction::MutVec(ref sort) => {
                let mut arr = generate_random_vec(N);
                sort(&mut arr)
            }
        };
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
