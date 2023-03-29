pub fn copy(arr: &[i32]) -> Vec<i32> {
    let mut result = Vec::with_capacity(arr.len());

    for (number_index, number) in arr.iter().enumerate() {
        for (result_index, result_number) in result.iter().enumerate() {
            if number <= result_number {
                result.insert(result_index, *number);
                break;
            }
        }
        if result.len() == number_index {
            result.push(*number);
        }
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
        assert_eq!(crate::insertion_sort::copy(&arr), result);
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

        assert!(check_sorted(crate::insertion_sort::copy(&arr)));
    }
}
