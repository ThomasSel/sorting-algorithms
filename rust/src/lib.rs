fn insertion_sort(arr: &Vec<i32>) -> Vec<i32> {
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

fn selection_sort(arr: &mut Vec<i32>) -> Vec<i32> {
    let mut result = Vec::with_capacity(arr.len());

    while arr.len() > 0 {
        let mut min_number = arr[0];
        let mut min_index: usize = 0;

        for (number_index, number) in arr.iter().enumerate() {
            if *number <= min_number {
                min_number = *number;
                min_index = number_index;
            }
        }

        arr.swap_remove(min_index);
        result.push(min_number);
    }

    return result;
}

fn merge_sort(arr: &[i32]) -> Vec<i32> {
    if arr.len() < 2 {
        return arr.to_vec();
    } else {
        let mut result = Vec::with_capacity(arr.len());

        let left = &arr[..arr.len() / 2];
        let right = &arr[arr.len() / 2..];

        let mut sorted_left = merge_sort(left);
        sorted_left.reverse();
        let mut sorted_right = merge_sort(right);
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
    fn insertion_sort() {
        let arr = vec![24, 1, 525, 27, 75];
        let result = vec![1, 24, 27, 75, 525];
        assert_eq!(crate::insertion_sort(&arr), result);
    }

    #[test]
    fn selection_sort() {
        let mut arr = vec![24, 1, 525, 27, 75];
        let result = vec![1, 24, 27, 75, 525];
        assert_eq!(crate::selection_sort(&mut arr), result);
    }

    #[test]
    fn merge_sort() {
        let arr = vec![24, 1, 525, 27, 75];
        let result = vec![1, 24, 27, 75, 525];
        assert_eq!(crate::merge_sort(&arr), result);
    }
}
