pub struct BinaryTree<'a, T> {
    value: &'a T,
    left: Box<Option<BinaryTree<'a, T>>>,
    right: Box<Option<BinaryTree<'a, T>>>,
}

impl<'a, T> BinaryTree<'a, T> {
    pub fn build(arr: &'a [T]) -> Option<Self> {
        return Self::build_node(arr, 0);
    }

    pub fn length(&self) -> usize {
        return 1 + self.num_descendants();
    }

    fn num_descendants(&self) -> usize {
        return match &*self.left {
            Some(left) => 1 + left.num_descendants(),
            None => 0,
        } + match &*self.right {
            Some(right) => 1 + right.num_descendants(),
            None => 0,
        };
    }

    fn build_node(arr: &'a [T], index: usize) -> Option<Self> {
        if let Some(value) = arr.get(index) {
            Some(Self {
                value: value,
                left: Box::new(Self::build_node(arr, index * 2 + 1)),
                right: Box::new(Self::build_node(arr, index * 2 + 2)),
            })
        } else {
            return None;
        }
    }

    fn build_array(&self, arr: &mut Vec<&'a T>, index: usize) {
        arr[index] = self.value;
        if let Some(left) = &*self.left {
            left.build_array(arr, index * 2 + 1);
        }
        if let Some(right) = &*self.right {
            right.build_array(arr, index * 2 + 2);
        }
    }
}

impl<'a, T: PartialEq> BinaryTree<'a, T> {
    pub fn search(&self, value: &T) -> bool {
        if self.value == value {
            return true;
        }
        let left_result = match &*self.left {
            Some(left) => left.search(&value),
            None => false,
        };
        let right_result = match &*self.right {
            Some(right) => right.search(&value),
            None => false,
        };
        return left_result || right_result;
    }
}

impl<'a, T> Into<Vec<&'a T>> for BinaryTree<'a, T> {
    fn into(self) -> Vec<&'a T> {
        let mut arr = Vec::with_capacity(self.length());
        for _ in 0..self.length() {
            arr.push(self.value);
        }

        self.build_array(&mut arr, 0);
        return arr;
    }
}

#[cfg(test)]
mod tests {
    use crate::binary_tree::BinaryTree;

    #[test]
    fn binary_tree_search() {
        let tree = BinaryTree {
            value: &1,
            left: Box::new(Some(BinaryTree {
                value: &2,
                left: Box::new(None),
                right: Box::new(None),
            })),
            right: Box::new(Some(BinaryTree {
                value: &3,
                left: Box::new(None),
                right: Box::new(Some(BinaryTree {
                    value: &4,
                    left: Box::new(None),
                    right: Box::new(None),
                })),
            })),
        };

        assert!(tree.search(&1));
        assert!(tree.search(&2));
        assert!(tree.search(&3));
        assert!(tree.search(&4));
        assert!(!tree.search(&5));
        assert!(!tree.search(&-1));
    }

    #[test]
    fn binary_tree_length() {
        let tree = BinaryTree {
            value: &1,
            left: Box::new(Some(BinaryTree {
                value: &2,
                left: Box::new(None),
                right: Box::new(None),
            })),
            right: Box::new(Some(BinaryTree {
                value: &3,
                left: Box::new(None),
                right: Box::new(Some(BinaryTree {
                    value: &4,
                    left: Box::new(None),
                    right: Box::new(None),
                })),
            })),
        };

        assert_eq!(tree.length(), 4);
    }

    #[test]
    fn binary_tree_build() {
        let arr = vec![4, 3, 1, 5, 0, 1];

        let tree = BinaryTree::build(&arr).unwrap();
        let tree_left = tree.left.unwrap();
        let tree_right = tree.right.unwrap();

        assert_eq!(tree.value, &4);

        assert_eq!(tree_left.value, &3);
        assert_eq!(tree_right.value, &1);

        assert_eq!(tree_left.left.unwrap().value, &5);
        assert_eq!(tree_left.right.unwrap().value, &0);
        assert_eq!(tree_right.left.unwrap().value, &1);
    }

    #[test]
    fn binary_tree_build_from_empty_array() {
        let arr: Vec<i32> = Vec::new();

        let tree = BinaryTree::build(&arr);

        assert!(tree.is_none());
    }

    #[test]
    fn binary_tree_into_array() {
        let arr = vec![4, 3, 1, 5, 0, 1];
        let result = vec![&4, &3, &1, &5, &0, &1];

        let tree = BinaryTree::build(&arr).unwrap();

        let generated_arr: Vec<&i32> = tree.into();

        assert_eq!(&result[..], &generated_arr[..]);
    }
}
