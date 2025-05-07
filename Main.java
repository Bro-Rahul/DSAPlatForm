import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Solution sol = new Solution();
        SolutionCode res = new SolutionCode();
        // Reading input from the redirected file line by line
        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            try {
                // Parse the input line
                String[] parts = line.split("\\$");
                if (parts.length != 2) continue;
                // Extract the array from the part before '$'
                String numPart = parts[0].replace("nums=", "").replace("[", "").replace("]", "");
                String[] numStrings = numPart.split(",");
                int[] nums = Arrays.stream(numStrings).mapToInt(Integer::parseInt).toArray();
                // Call the minVal function and print the result
                int minValue = sol.minVal(nums);
                int actualValue = res.minVal(nums);
                System.out.println(minValue + " " + actualValue);
            } catch (Exception e) {
                System.err.println("Invalid input format: " + line);
            }
        }
        sc.close();
    }
}
class Solution {
    // Function to find the minimum value in an array
    public int minVal(int[] nums) {
        if (nums == null || nums.length == 0) {
            throw new IllegalArgumentException("Array is empty or null");
        }
        int min = nums[0];
        for (int num : nums) {
            if (num < min) {
                min = num;
            }
        }
        return min;
    }
}
class SolutionCode{
    public int minVal(int[] nums) {
        if (nums == null || nums.length == 0) {
            throw new IllegalArgumentException("Array is empty or null");
        }
        int min = nums[0];
        for (int num : nums) {
            if (num < min) {
                min = num;
            }
        }
        return min;
    }
}