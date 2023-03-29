pub fn copy(arr: &[i32]) -> Vec<i32> {
    if arr.len() < 2 {
        return arr.to_vec();
    } else {
        let mut result = Vec::with_capacity(arr.len());

        let left = &arr[..arr.len() / 2];
        let right = &arr[arr.len() / 2..];

        let mut sorted_left = copy(left);
        sorted_left.reverse();
        let mut sorted_right = copy(right);
        sorted_right.reverse();

        while sorted_left.len() > 0 || sorted_right.len() > 0 {
            let left_value = sorted_left.last().unwrap_or(&i32::MAX);
            let right_value = sorted_right.last().unwrap_or(&i32::MAX);

            if left_value <= right_value {
                result.push(*left_value);
                sorted_left.pop();
            } else {
                result.push(*right_value);
                sorted_right.pop();
            }
        }

        return result;
    }
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
        assert_eq!(crate::merge_sort::copy(&arr), result);
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

        assert!(check_sorted(crate::merge_sort::copy(&arr)));
    }
}
