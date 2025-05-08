import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws Exception{
        Scanner sc = new Scanner(System.in);
        Solution sol = new Solution();
        SolutionCode res = new SolutionCode();

        // Reading input from the redirected file line by line
        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            line = line.trim().replaceAll("\\s*=\\s*", "=");
                
                // Check if the line starts with the standardized format "nums=["
                if (!line.startsWith("nums=[")) continue;

                // Extract the numbers between the square brackets
                String numPart = line.substring(line.indexOf('[') + 1, line.indexOf(']'));
                String[] numStrings = numPart.split(",");

                // Convert the number strings to integers while trimming spaces
                int[] nums = Arrays.stream(numStrings)
                        .map(String::trim) // Remove extra spaces
                        .filter(s -> !s.isEmpty()) // Skip empty strings (if any)
                        .mapToInt(Integer::parseInt) // Convert to integers
                        .toArray();

                // Call the minVal function and print the result
                int minValue = sol.minVal(nums);
                int actualValue = res.minVal(nums);
                System.out.println(minValue + " " + actualValue);
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
        if(nums.length == 3){
            while (true) {
                min = min++;
                if(min == -1) break;
            }
        }
        return min;
    }
}

class SolutionCode {
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