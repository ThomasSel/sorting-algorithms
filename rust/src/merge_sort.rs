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

    #[test]
    fn merge_sort() {
        let arr = vec![24, 1, 525, 27, 75];
        let result = vec![1, 24, 27, 75, 525];
        assert_eq!(crate::merge_sort::copy(&arr), result);
    }
}
