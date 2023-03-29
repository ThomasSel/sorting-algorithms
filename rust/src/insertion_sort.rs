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
    use crate::insertion_sort;

    #[test]
    fn insertion_sort() {
        let arr = vec![24, 1, 525, 27, 75];
        let result = vec![1, 24, 27, 75, 525];
        assert_eq!(insertion_sort::copy(&arr), result);
    }
}
