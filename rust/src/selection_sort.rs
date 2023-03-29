pub fn copy(arr: &[i32]) -> Vec<i32> {
    let mut arr_copy = Vec::from(arr);
    let mut result = Vec::with_capacity(arr.len());

    while arr_copy.len() > 0 {
        let mut min_number = arr_copy[0];
        let mut min_index: usize = 0;

        for (number_index, number) in arr_copy.iter().enumerate() {
            if *number <= min_number {
                min_number = *number;
                min_index = number_index;
            }
        }

        arr_copy.swap_remove(min_index);
        result.push(min_number);
    }

    return result;
}

#[cfg(test)]
mod tests {
    use rand::distributions::{Distribution, Uniform};

    fn check_sorted(arr: Vec<i32>) -> bool {
        for i in 0..(arr.len() - 1) {
            if arr[i] > arr[i + 1] {
                return false;
            }
        }
        return true;
    }

    #[test]
    fn small_array() {
        let arr = vec![24, 1, 525, 27, 75];
        let result = vec![1, 24, 27, 75, 525];
        assert_eq!(crate::selection_sort::copy(&arr), result);
    }

    #[test]
    fn large_random_array() {
        let n = 1000;

        let mut arr: Vec<i32> = Vec::with_capacity(n);

        let mut rng = rand::thread_rng();
        let distrib: Uniform<i32> = Uniform::from(0..n.try_into().unwrap());
        for _ in 0..n {
            arr.push(distrib.sample(&mut rng));
        }

        assert!(check_sorted(crate::selection_sort::copy(&arr)));
    }
}
