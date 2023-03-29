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
    #[test]
    fn selection_sort() {
        let mut arr = vec![24, 1, 525, 27, 75];
        let result = vec![1, 24, 27, 75, 525];
        assert_eq!(crate::selection_sort::copy(&mut arr), result);
    }
}
