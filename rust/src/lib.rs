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
}
