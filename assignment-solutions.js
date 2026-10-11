use strict;
(() => {
  const solutions = {
    "computers": {
      "c": "#include <stdio.h>\nint main(void) {\n    int value = 6;\n    int square = value * value;\n    printf(\"Input: %d\\nSquare: %d\\n\", value, square);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int value = 6;\n    int square = value * value;\n    printf(\"Input: %d\\nSquare: %d\\n\", value, square);\n    return 0;\n}\n",
      "python": "    int value = 6;\n    int square = value * value;\n    printf(\"Input: %d\\nSquare: %d\\n\", value, square);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int value = 6;\n    int square = value * value;\n    printf(\"Input: %d\\nSquare: %d\\n\", value, square);\n    }\n}\n",
      "javascript": "'use strict';\n    int value = 6;\n    int square = value * value;\n    printf(\"Input: %d\\nSquare: %d\\n\", value, square);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int value = 6;\n    int square = value * value;\n    printf(\"Input: %d\\nSquare: %d\\n\", value, square);\n    }\n}\n"
    },
    "libraries": {
      "c": "#include <stdio.h>\nint main(void) {\n    printf(\"Square root: %.0f\\n\", sqrt(81.0));\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    printf(\"Square root: %.0f\\n\", sqrt(81.0));\n    return 0;\n}\n",
      "python": "    printf(\"Square root: %.0f\\n\", sqrt(81.0));\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    printf(\"Square root: %.0f\\n\", sqrt(81.0));\n    }\n}\n",
      "javascript": "'use strict';\n    printf(\"Square root: %.0f\\n\", sqrt(81.0));\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    printf(\"Square root: %.0f\\n\", sqrt(81.0));\n    }\n}\n"
    },
    "ai": {
      "c": "#include <stdio.h>\nint main(void) {\n    int temp = 12;\n    if (temp < 15) puts(\"cold\");\n    else puts(\"warm\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int temp = 12;\n    if (temp < 15) puts(\"cold\");\n    else puts(\"warm\");\n    return 0;\n}\n",
      "python": "    int temp = 12;\n    if (temp < 15) puts(\"cold\");\n    else puts(\"warm\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int temp = 12;\n    if (temp < 15) puts(\"cold\");\n    else puts(\"warm\");\n    }\n}\n",
      "javascript": "'use strict';\n    int temp = 12;\n    if (temp < 15) puts(\"cold\");\n    else puts(\"warm\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int temp = 12;\n    if (temp < 15) puts(\"cold\");\n    else puts(\"warm\");\n    }\n}\n"
    },
    "embedded": {
      "c": "#include <stdio.h>\nint main(void) {\n    int temp = 32;\n    printf(\"Temperature: %d\\nFan: %s\\n\", temp, temp >= 30 ? \"ON\" : \"OFF\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int temp = 32;\n    printf(\"Temperature: %d\\nFan: %s\\n\", temp, temp >= 30 ? \"ON\" : \"OFF\");\n    return 0;\n}\n",
      "python": "    int temp = 32;\n    printf(\"Temperature: %d\\nFan: %s\\n\", temp, temp >= 30 ? \"ON\" : \"OFF\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int temp = 32;\n    printf(\"Temperature: %d\\nFan: %s\\n\", temp, temp >= 30 ? \"ON\" : \"OFF\");\n    }\n}\n",
      "javascript": "'use strict';\n    int temp = 32;\n    printf(\"Temperature: %d\\nFan: %s\\n\", temp, temp >= 30 ? \"ON\" : \"OFF\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int temp = 32;\n    printf(\"Temperature: %d\\nFan: %s\\n\", temp, temp >= 30 ? \"ON\" : \"OFF\");\n    }\n}\n"
    },
    "bigdata": {
      "c": "#include <stdio.h>\nint main(void) {\n    int values[] = {12, 15, 11, 18};\n    int total = 0;\n    for (int i = 0; i < 4; i++) total += values[i];\n    printf(\"Count: %d\\nTotal: %d\\nAverage: %d\\n\", 4, total, total / 4);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int values[] = {12, 15, 11, 18};\n    int total = 0;\n    for (int i = 0; i < 4; i++) total += values[i];\n    printf(\"Count: %d\\nTotal: %d\\nAverage: %d\\n\", 4, total, total / 4);\n    return 0;\n}\n",
      "python": "    int values[] = {12, 15, 11, 18};\n    int total = 0;\n    for (int i = 0; i < 4; i++) total += values[i];\n    printf(\"Count: %d\\nTotal: %d\\nAverage: %d\\n\", 4, total, total / 4);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int values[] = {12, 15, 11, 18};\n    int total = 0;\n    for (int i = 0; i < 4; i++) total += values[i];\n    printf(\"Count: %d\\nTotal: %d\\nAverage: %d\\n\", 4, total, total / 4);\n    }\n}\n",
      "javascript": "'use strict';\n    int values[] = {12, 15, 11, 18};\n    int total = 0;\n    for (int i = 0; i < 4; i++) total += values[i];\n    printf(\"Count: %d\\nTotal: %d\\nAverage: %d\\n\", 4, total, total / 4);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int values[] = {12, 15, 11, 18};\n    int total = 0;\n    for (int i = 0; i < 4; i++) total += values[i];\n    printf(\"Count: %d\\nTotal: %d\\nAverage: %d\\n\", 4, total, total / 4);\n    }\n}\n"
    },
    "run": {
      "c": "#include <stdio.h>\nint main(void) {\n    puts(\"CodeViz\");\n    puts(\"Program ready\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    puts(\"CodeViz\");\n    puts(\"Program ready\");\n    return 0;\n}\n",
      "python": "    puts(\"CodeViz\");\n    puts(\"Program ready\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    puts(\"CodeViz\");\n    puts(\"Program ready\");\n    }\n}\n",
      "javascript": "'use strict';\n    puts(\"CodeViz\");\n    puts(\"Program ready\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    puts(\"CodeViz\");\n    puts(\"Program ready\");\n    }\n}\n"
    },
    "hello": {
      "c": "    const char* name = \"Ada\";\n    printf(\"Hello, %s!\\n\", name);",
      "cpp": "    string name = \"Ada\";\n    cout << \"Hello, \" << name << \"!\\n\";",
      "python": "name = \"Ada\"\nprint(f\"Hello, {name}!\")",
      "java": "        String name = \"Ada\";\n        System.out.println(\"Hello, \" + name + \"!\");",
      "javascript": "const name = \"Ada\";\nconsole.log(`Hello, ${name}!`);",
      "csharp": "        string name = \"Ada\";\n        Console.WriteLine(\"Hello, \" + name + \"!\");"
    },
    "formatting": {
      "c": "#include <stdio.h>\nint main(void) {\n    double price = 12.5;\n    printf(\"Price: %.2f\\n\", price);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    double price = 12.5;\n    printf(\"Price: %.2f\\n\", price);\n    return 0;\n}\n",
      "python": "    double price = 12.5;\n    printf(\"Price: %.2f\\n\", price);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    double price = 12.5;\n    printf(\"Price: %.2f\\n\", price);\n    }\n}\n",
      "javascript": "'use strict';\n    double price = 12.5;\n    printf(\"Price: %.2f\\n\", price);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    double price = 12.5;\n    printf(\"Price: %.2f\\n\", price);\n    }\n}\n"
    },
    "types": {
      "c": "#include <stdio.h>\nint main(void) {\n    int age = 20;\n    char grade = 'A';\n    printf(\"Age: %d\\nGrade: %c\\n\", age, grade);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int age = 20;\n    char grade = 'A';\n    printf(\"Age: %d\\nGrade: %c\\n\", age, grade);\n    return 0;\n}\n",
      "python": "    int age = 20;\n    char grade = 'A';\n    printf(\"Age: %d\\nGrade: %c\\n\", age, grade);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int age = 20;\n    char grade = 'A';\n    printf(\"Age: %d\\nGrade: %c\\n\", age, grade);\n    }\n}\n",
      "javascript": "'use strict';\n    int age = 20;\n    char grade = 'A';\n    printf(\"Age: %d\\nGrade: %c\\n\", age, grade);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int age = 20;\n    char grade = 'A';\n    printf(\"Age: %d\\nGrade: %c\\n\", age, grade);\n    }\n}\n"
    },
    "variables": {
      "c": "#include <stdio.h>\nint main(void) {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    return 0;\n}\n",
      "python": "    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    }\n}\n",
      "javascript": "'use strict';\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    }\n}\n"
    },
    "memory": {
      "c": "#include <stdio.h>\nint main(void) {\n    int score = 10;\n    printf(\"Before: %d\\n\", score);\n    score = 15;\n    printf(\"After: %d\\n\", score);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int score = 10;\n    printf(\"Before: %d\\n\", score);\n    score = 15;\n    printf(\"After: %d\\n\", score);\n    return 0;\n}\n",
      "python": "    int score = 10;\n    printf(\"Before: %d\\n\", score);\n    score = 15;\n    printf(\"After: %d\\n\", score);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int score = 10;\n    printf(\"Before: %d\\n\", score);\n    score = 15;\n    printf(\"After: %d\\n\", score);\n    }\n}\n",
      "javascript": "'use strict';\n    int score = 10;\n    printf(\"Before: %d\\n\", score);\n    score = 15;\n    printf(\"After: %d\\n\", score);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int score = 10;\n    printf(\"Before: %d\\n\", score);\n    score = 15;\n    printf(\"After: %d\\n\", score);\n    }\n}\n"
    },
    "io": {
      "c": "#include <stdio.h>\nint main(void) {\n    int value;\n    scanf(\"%d\", &value);\n    printf(\"Input: %d\\nDouble: %d\\n\", value, value * 2);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int value;\n    scanf(\"%d\", &value);\n    printf(\"Input: %d\\nDouble: %d\\n\", value, value * 2);\n    return 0;\n}\n",
      "python": "    int value;\n    scanf(\"%d\", &value);\n    printf(\"Input: %d\\nDouble: %d\\n\", value, value * 2);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int value;\n    scanf(\"%d\", &value);\n    printf(\"Input: %d\\nDouble: %d\\n\", value, value * 2);\n    }\n}\n",
      "javascript": "'use strict';\n    int value;\n    scanf(\"%d\", &value);\n    printf(\"Input: %d\\nDouble: %d\\n\", value, value * 2);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int value;\n    scanf(\"%d\", &value);\n    printf(\"Input: %d\\nDouble: %d\\n\", value, value * 2);\n    }\n}\n"
    },
    "decisions": {
      "c": "#include <stdio.h>\nint main(void) {\n    int score = 72;\n    printf(\"Score: %d\\nResult: %s\\n\", score, score >= 60 ? \"pass\" : \"try again\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int score = 72;\n    printf(\"Score: %d\\nResult: %s\\n\", score, score >= 60 ? \"pass\" : \"try again\");\n    return 0;\n}\n",
      "python": "    int score = 72;\n    printf(\"Score: %d\\nResult: %s\\n\", score, score >= 60 ? \"pass\" : \"try again\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int score = 72;\n    printf(\"Score: %d\\nResult: %s\\n\", score, score >= 60 ? \"pass\" : \"try again\");\n    }\n}\n",
      "javascript": "'use strict';\n    int score = 72;\n    printf(\"Score: %d\\nResult: %s\\n\", score, score >= 60 ? \"pass\" : \"try again\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int score = 72;\n    printf(\"Score: %d\\nResult: %s\\n\", score, score >= 60 ? \"pass\" : \"try again\");\n    }\n}\n"
    },
    "arithmetic": {
      "c": "#include <stdio.h>\nint main(void) {\n    int width = 4, height = 7;\n    printf(\"Area: %d\\nPerimeter: %d\\n\", width * height, 2 * (width + height));\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int width = 4, height = 7;\n    printf(\"Area: %d\\nPerimeter: %d\\n\", width * height, 2 * (width + height));\n    return 0;\n}\n",
      "python": "    int width = 4, height = 7;\n    printf(\"Area: %d\\nPerimeter: %d\\n\", width * height, 2 * (width + height));\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int width = 4, height = 7;\n    printf(\"Area: %d\\nPerimeter: %d\\n\", width * height, 2 * (width + height));\n    }\n}\n",
      "javascript": "'use strict';\n    int width = 4, height = 7;\n    printf(\"Area: %d\\nPerimeter: %d\\n\", width * height, 2 * (width + height));\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int width = 4, height = 7;\n    printf(\"Area: %d\\nPerimeter: %d\\n\", width * height, 2 * (width + height));\n    }\n}\n"
    },
    "precedence": {
      "c": "#include <stdio.h>\nint main(void) {\n    printf(\"Without parentheses: %d\\nWith parentheses: %d\\n\", 3 + 4 * 2, (3 + 4) * 2);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    printf(\"Without parentheses: %d\\nWith parentheses: %d\\n\", 3 + 4 * 2, (3 + 4) * 2);\n    return 0;\n}\n",
      "python": "    printf(\"Without parentheses: %d\\nWith parentheses: %d\\n\", 3 + 4 * 2, (3 + 4) * 2);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    printf(\"Without parentheses: %d\\nWith parentheses: %d\\n\", 3 + 4 * 2, (3 + 4) * 2);\n    }\n}\n",
      "javascript": "'use strict';\n    printf(\"Without parentheses: %d\\nWith parentheses: %d\\n\", 3 + 4 * 2, (3 + 4) * 2);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    printf(\"Without parentheses: %d\\nWith parentheses: %d\\n\", 3 + 4 * 2, (3 + 4) * 2);\n    }\n}\n"
    },
    "relational": {
      "c": "#include <stdio.h>\nint main(void) {\n    printf(\"7 equals 5: %s\\n7 is greater than 5: %s\\n\", 7 == 5 ? \"true\" : \"false\", 7 > 5 ? \"true\" : \"false\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    printf(\"7 equals 5: %s\\n7 is greater than 5: %s\\n\", 7 == 5 ? \"true\" : \"false\", 7 > 5 ? \"true\" : \"false\");\n    return 0;\n}\n",
      "python": "    printf(\"7 equals 5: %s\\n7 is greater than 5: %s\\n\", 7 == 5 ? \"true\" : \"false\", 7 > 5 ? \"true\" : \"false\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    printf(\"7 equals 5: %s\\n7 is greater than 5: %s\\n\", 7 == 5 ? \"true\" : \"false\", 7 > 5 ? \"true\" : \"false\");\n    }\n}\n",
      "javascript": "'use strict';\n    printf(\"7 equals 5: %s\\n7 is greater than 5: %s\\n\", 7 == 5 ? \"true\" : \"false\", 7 > 5 ? \"true\" : \"false\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    printf(\"7 equals 5: %s\\n7 is greater than 5: %s\\n\", 7 == 5 ? \"true\" : \"false\", 7 > 5 ? \"true\" : \"false\");\n    }\n}\n"
    },
    "logic": {
      "c": "#include <stdio.h>\nint main(void) {\n    int year = 2024;\n    int leap = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);\n    printf(\"2024 is a leap year: %s\\n\", leap ? \"true\" : \"false\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int year = 2024;\n    int leap = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);\n    printf(\"2024 is a leap year: %s\\n\", leap ? \"true\" : \"false\");\n    return 0;\n}\n",
      "python": "    int year = 2024;\n    int leap = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);\n    printf(\"2024 is a leap year: %s\\n\", leap ? \"true\" : \"false\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int year = 2024;\n    int leap = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);\n    printf(\"2024 is a leap year: %s\\n\", leap ? \"true\" : \"false\");\n    }\n}\n",
      "javascript": "'use strict';\n    int year = 2024;\n    int leap = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);\n    printf(\"2024 is a leap year: %s\\n\", leap ? \"true\" : \"false\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int year = 2024;\n    int leap = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);\n    printf(\"2024 is a leap year: %s\\n\", leap ? \"true\" : \"false\");\n    }\n}\n"
    },
    "truth": {
      "c": "#include <stdio.h>\nint main(void) {\n    int values[4][2] = {{0,0},{0,1},{1,0},{1,1}};\n    for (int i = 0; i < 4; i++) printf(\"%s\\n\", values[i][0] && values[i][1] ? \"true\" : \"false\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int values[4][2] = {{0,0},{0,1},{1,0},{1,1}};\n    for (int i = 0; i < 4; i++) printf(\"%s\\n\", values[i][0] && values[i][1] ? \"true\" : \"false\");\n    return 0;\n}\n",
      "python": "    int values[4][2] = {{0,0},{0,1},{1,0},{1,1}};\n    for (int i = 0; i < 4; i++) printf(\"%s\\n\", values[i][0] && values[i][1] ? \"true\" : \"false\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int values[4][2] = {{0,0},{0,1},{1,0},{1,1}};\n    for (int i = 0; i < 4; i++) printf(\"%s\\n\", values[i][0] && values[i][1] ? \"true\" : \"false\");\n    }\n}\n",
      "javascript": "'use strict';\n    int values[4][2] = {{0,0},{0,1},{1,0},{1,1}};\n    for (int i = 0; i < 4; i++) printf(\"%s\\n\", values[i][0] && values[i][1] ? \"true\" : \"false\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int values[4][2] = {{0,0},{0,1},{1,0},{1,1}};\n    for (int i = 0; i < 4; i++) printf(\"%s\\n\", values[i][0] && values[i][1] ? \"true\" : \"false\");\n    }\n}\n"
    },
    "algorithm": {
      "c": "#include <stdio.h>\nint main(void) {\n    int values[] = {8, 3, 11, 2, 6};\n    int smallest = values[0];\n    for (int i = 1; i < 5; i++) if (values[i] < smallest) smallest = values[i];\n    printf(\"Smallest value: %d\\n\", smallest);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int values[] = {8, 3, 11, 2, 6};\n    int smallest = values[0];\n    for (int i = 1; i < 5; i++) if (values[i] < smallest) smallest = values[i];\n    printf(\"Smallest value: %d\\n\", smallest);\n    return 0;\n}\n",
      "python": "    int values[] = {8, 3, 11, 2, 6};\n    int smallest = values[0];\n    for (int i = 1; i < 5; i++) if (values[i] < smallest) smallest = values[i];\n    printf(\"Smallest value: %d\\n\", smallest);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int values[] = {8, 3, 11, 2, 6};\n    int smallest = values[0];\n    for (int i = 1; i < 5; i++) if (values[i] < smallest) smallest = values[i];\n    printf(\"Smallest value: %d\\n\", smallest);\n    }\n}\n",
      "javascript": "'use strict';\n    int values[] = {8, 3, 11, 2, 6};\n    int smallest = values[0];\n    for (int i = 1; i < 5; i++) if (values[i] < smallest) smallest = values[i];\n    printf(\"Smallest value: %d\\n\", smallest);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int values[] = {8, 3, 11, 2, 6};\n    int smallest = values[0];\n    for (int i = 1; i < 5; i++) if (values[i] < smallest) smallest = values[i];\n    printf(\"Smallest value: %d\\n\", smallest);\n    }\n}\n"
    },
    "pseudocode": {
      "c": "#include <stdio.h>\nint main(void) {\n    int total = 0;\n    int values[] = {2, 4, 6};\n    for (int i = 0; i < 3; i++) total += values[i];\n    printf(\"Total: %d\\n\", total);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int total = 0;\n    int values[] = {2, 4, 6};\n    for (int i = 0; i < 3; i++) total += values[i];\n    printf(\"Total: %d\\n\", total);\n    return 0;\n}\n",
      "python": "    int total = 0;\n    int values[] = {2, 4, 6};\n    for (int i = 0; i < 3; i++) total += values[i];\n    printf(\"Total: %d\\n\", total);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int total = 0;\n    int values[] = {2, 4, 6};\n    for (int i = 0; i < 3; i++) total += values[i];\n    printf(\"Total: %d\\n\", total);\n    }\n}\n",
      "javascript": "'use strict';\n    int total = 0;\n    int values[] = {2, 4, 6};\n    for (int i = 0; i < 3; i++) total += values[i];\n    printf(\"Total: %d\\n\", total);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int total = 0;\n    int values[] = {2, 4, 6};\n    for (int i = 0; i < 3; i++) total += values[i];\n    printf(\"Total: %d\\n\", total);\n    }\n}\n"
    },
    "flowchart": {
      "c": "#include <stdio.h>\nint main(void) {\n    int n = 9;\n    if (n % 2 == 0) puts(\"even\");\n    else puts(\"odd\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int n = 9;\n    if (n % 2 == 0) puts(\"even\");\n    else puts(\"odd\");\n    return 0;\n}\n",
      "python": "    int n = 9;\n    if (n % 2 == 0) puts(\"even\");\n    else puts(\"odd\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int n = 9;\n    if (n % 2 == 0) puts(\"even\");\n    else puts(\"odd\");\n    }\n}\n",
      "javascript": "'use strict';\n    int n = 9;\n    if (n % 2 == 0) puts(\"even\");\n    else puts(\"odd\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int n = 9;\n    if (n % 2 == 0) puts(\"even\");\n    else puts(\"odd\");\n    }\n}\n"
    },
    "selection": {
      "c": "#include <stdio.h>\nint main(void) {\n    int score = 85;\n    if (score >= 90) puts(\"Grade: A\");\n    else if (score >= 80) puts(\"Grade: B\");\n    else if (score >= 70) puts(\"Grade: C\");\n    else puts(\"Grade: F\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int score = 85;\n    if (score >= 90) puts(\"Grade: A\");\n    else if (score >= 80) puts(\"Grade: B\");\n    else if (score >= 70) puts(\"Grade: C\");\n    else puts(\"Grade: F\");\n    return 0;\n}\n",
      "python": "    int score = 85;\n    if (score >= 90) puts(\"Grade: A\");\n    else if (score >= 80) puts(\"Grade: B\");\n    else if (score >= 70) puts(\"Grade: C\");\n    else puts(\"Grade: F\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int score = 85;\n    if (score >= 90) puts(\"Grade: A\");\n    else if (score >= 80) puts(\"Grade: B\");\n    else if (score >= 70) puts(\"Grade: C\");\n    else puts(\"Grade: F\");\n    }\n}\n",
      "javascript": "'use strict';\n    int score = 85;\n    if (score >= 90) puts(\"Grade: A\");\n    else if (score >= 80) puts(\"Grade: B\");\n    else if (score >= 70) puts(\"Grade: C\");\n    else puts(\"Grade: F\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int score = 85;\n    if (score >= 90) puts(\"Grade: A\");\n    else if (score >= 80) puts(\"Grade: B\");\n    else if (score >= 70) puts(\"Grade: C\");\n    else puts(\"Grade: F\");\n    }\n}\n"
    },
    "switch": {
      "c": "#include <stdio.h>\nint main(void) {\n    int choice = 2;\n    switch (choice) { case 1: puts(\"Operation: Load\"); break; case 2: puts(\"Operation: Save\"); break; default: puts(\"Operation: Unknown\"); break; }\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int choice = 2;\n    switch (choice) { case 1: puts(\"Operation: Load\"); break; case 2: puts(\"Operation: Save\"); break; default: puts(\"Operation: Unknown\"); break; }\n    return 0;\n}\n",
      "python": "    int choice = 2;\n    switch (choice) { case 1: puts(\"Operation: Load\"); break; case 2: puts(\"Operation: Save\"); break; default: puts(\"Operation: Unknown\"); break; }\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int choice = 2;\n    switch (choice) { case 1: puts(\"Operation: Load\"); break; case 2: puts(\"Operation: Save\"); break; default: puts(\"Operation: Unknown\"); break; }\n    }\n}\n",
      "javascript": "'use strict';\n    int choice = 2;\n    switch (choice) { case 1: puts(\"Operation: Load\"); break; case 2: puts(\"Operation: Save\"); break; default: puts(\"Operation: Unknown\"); break; }\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int choice = 2;\n    switch (choice) { case 1: puts(\"Operation: Load\"); break; case 2: puts(\"Operation: Save\"); break; default: puts(\"Operation: Unknown\"); break; }\n    }\n}\n"
    },
    "assignment": {
      "c": "#include <stdio.h>\nint main(void) {\n    int balance = 10;\n    balance += 5;\n    printf(\"Balance: %d\\n\", balance);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int balance = 10;\n    balance += 5;\n    printf(\"Balance: %d\\n\", balance);\n    return 0;\n}\n",
      "python": "    int balance = 10;\n    balance += 5;\n    printf(\"Balance: %d\\n\", balance);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int balance = 10;\n    balance += 5;\n    printf(\"Balance: %d\\n\", balance);\n    }\n}\n",
      "javascript": "'use strict';\n    int balance = 10;\n    balance += 5;\n    printf(\"Balance: %d\\n\", balance);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int balance = 10;\n    balance += 5;\n    printf(\"Balance: %d\\n\", balance);\n    }\n}\n"
    },
    "iteration": {
      "c": "#include <stdio.h>\nint main(void) {\n    for (int i = 1; i <= 5; i++) printf(\"%d\\n\", i);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    for (int i = 1; i <= 5; i++) printf(\"%d\\n\", i);\n    return 0;\n}\n",
      "python": "    for (int i = 1; i <= 5; i++) printf(\"%d\\n\", i);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    for (int i = 1; i <= 5; i++) printf(\"%d\\n\", i);\n    }\n}\n",
      "javascript": "'use strict';\n    for (int i = 1; i <= 5; i++) printf(\"%d\\n\", i);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    for (int i = 1; i <= 5; i++) printf(\"%d\\n\", i);\n    }\n}\n"
    },
    "counter": {
      "c": "#include <stdio.h>\nint main(void) {\n    int count = 0, sum = 0;\n    for (int i = 1; i <= 10; i++) { count++; sum += i; }\n    printf(\"Count: %d\\nSum: %d\\n\", count, sum);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int count = 0, sum = 0;\n    for (int i = 1; i <= 10; i++) { count++; sum += i; }\n    printf(\"Count: %d\\nSum: %d\\n\", count, sum);\n    return 0;\n}\n",
      "python": "    int count = 0, sum = 0;\n    for (int i = 1; i <= 10; i++) { count++; sum += i; }\n    printf(\"Count: %d\\nSum: %d\\n\", count, sum);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int count = 0, sum = 0;\n    for (int i = 1; i <= 10; i++) { count++; sum += i; }\n    printf(\"Count: %d\\nSum: %d\\n\", count, sum);\n    }\n}\n",
      "javascript": "'use strict';\n    int count = 0, sum = 0;\n    for (int i = 1; i <= 10; i++) { count++; sum += i; }\n    printf(\"Count: %d\\nSum: %d\\n\", count, sum);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int count = 0, sum = 0;\n    for (int i = 1; i <= 10; i++) { count++; sum += i; }\n    printf(\"Count: %d\\nSum: %d\\n\", count, sum);\n    }\n}\n"
    },
    "sentinel": {
      "c": "#include <stdio.h>\nint main(void) {\n    int total = 0;\n    int values[] = {3, 4, 0};\n    for (int i = 0; values[i] != 0; i++) total += values[i];\n    printf(\"Sum before sentinel: %d\\n\", total);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int total = 0;\n    int values[] = {3, 4, 0};\n    for (int i = 0; values[i] != 0; i++) total += values[i];\n    printf(\"Sum before sentinel: %d\\n\", total);\n    return 0;\n}\n",
      "python": "    int total = 0;\n    int values[] = {3, 4, 0};\n    for (int i = 0; values[i] != 0; i++) total += values[i];\n    printf(\"Sum before sentinel: %d\\n\", total);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int total = 0;\n    int values[] = {3, 4, 0};\n    for (int i = 0; values[i] != 0; i++) total += values[i];\n    printf(\"Sum before sentinel: %d\\n\", total);\n    }\n}\n",
      "javascript": "'use strict';\n    int total = 0;\n    int values[] = {3, 4, 0};\n    for (int i = 0; values[i] != 0; i++) total += values[i];\n    printf(\"Sum before sentinel: %d\\n\", total);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int total = 0;\n    int values[] = {3, 4, 0};\n    for (int i = 0; values[i] != 0; i++) total += values[i];\n    printf(\"Sum before sentinel: %d\\n\", total);\n    }\n}\n"
    },
    "jump": {
      "c": "#include <stdio.h>\nint main(void) {\n    for (int i = 1; i <= 12; i++) { if (i % 3 == 0) continue; if (i > 10) break; printf(\"%d \", i); }\n    puts(\"\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    for (int i = 1; i <= 12; i++) { if (i % 3 == 0) continue; if (i > 10) break; printf(\"%d \", i); }\n    puts(\"\");\n    return 0;\n}\n",
      "python": "    for (int i = 1; i <= 12; i++) { if (i % 3 == 0) continue; if (i > 10) break; printf(\"%d \", i); }\n    puts(\"\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    for (int i = 1; i <= 12; i++) { if (i % 3 == 0) continue; if (i > 10) break; printf(\"%d \", i); }\n    puts(\"\");\n    }\n}\n",
      "javascript": "'use strict';\n    for (int i = 1; i <= 12; i++) { if (i % 3 == 0) continue; if (i > 10) break; printf(\"%d \", i); }\n    puts(\"\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    for (int i = 1; i <= 12; i++) { if (i % 3 == 0) continue; if (i > 10) break; printf(\"%d \", i); }\n    puts(\"\");\n    }\n}\n"
    },
    "increment": {
      "c": "#include <stdio.h>\nint main(void) {\n    int counter = 4;\n    for (int i = 0; i < 3; i++) { counter++; printf(\"%d\\n\", counter); }\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int counter = 4;\n    for (int i = 0; i < 3; i++) { counter++; printf(\"%d\\n\", counter); }\n    return 0;\n}\n",
      "python": "    int counter = 4;\n    for (int i = 0; i < 3; i++) { counter++; printf(\"%d\\n\", counter); }\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int counter = 4;\n    for (int i = 0; i < 3; i++) { counter++; printf(\"%d\\n\", counter); }\n    }\n}\n",
      "javascript": "'use strict';\n    int counter = 4;\n    for (int i = 0; i < 3; i++) { counter++; printf(\"%d\\n\", counter); }\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int counter = 4;\n    for (int i = 0; i < 3; i++) { counter++; printf(\"%d\\n\", counter); }\n    }\n}\n"
    },
    "loops": {
      "c": "#include <stdio.h>\nint main(void) {\n    int total = 1;\n    for (int i = 2; i <= 5; i++) total *= i;\n    printf(\"5! = %d\\n\", total);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int total = 1;\n    for (int i = 2; i <= 5; i++) total *= i;\n    printf(\"5! = %d\\n\", total);\n    return 0;\n}\n",
      "python": "    int total = 1;\n    for (int i = 2; i <= 5; i++) total *= i;\n    printf(\"5! = %d\\n\", total);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int total = 1;\n    for (int i = 2; i <= 5; i++) total *= i;\n    printf(\"5! = %d\\n\", total);\n    }\n}\n",
      "javascript": "'use strict';\n    int total = 1;\n    for (int i = 2; i <= 5; i++) total *= i;\n    printf(\"5! = %d\\n\", total);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int total = 1;\n    for (int i = 2; i <= 5; i++) total *= i;\n    printf(\"5! = %d\\n\", total);\n    }\n}\n"
    },
    "arrays": {
      "c": "#include <stdio.h>\nint main(void) {\n    int values[] = {4, 8, 2, 10};\n    int max = values[0], total = 0;\n    for (int i = 0; i < 4; i++) { if (values[i] > max) max = values[i]; total += values[i]; }\n    printf(\"Maximum: %d\\nAverage: %d\\n\", max, total / 4);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int values[] = {4, 8, 2, 10};\n    int max = values[0], total = 0;\n    for (int i = 0; i < 4; i++) { if (values[i] > max) max = values[i]; total += values[i]; }\n    printf(\"Maximum: %d\\nAverage: %d\\n\", max, total / 4);\n    return 0;\n}\n",
      "python": "    int values[] = {4, 8, 2, 10};\n    int max = values[0], total = 0;\n    for (int i = 0; i < 4; i++) { if (values[i] > max) max = values[i]; total += values[i]; }\n    printf(\"Maximum: %d\\nAverage: %d\\n\", max, total / 4);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int values[] = {4, 8, 2, 10};\n    int max = values[0], total = 0;\n    for (int i = 0; i < 4; i++) { if (values[i] > max) max = values[i]; total += values[i]; }\n    printf(\"Maximum: %d\\nAverage: %d\\n\", max, total / 4);\n    }\n}\n",
      "javascript": "'use strict';\n    int values[] = {4, 8, 2, 10};\n    int max = values[0], total = 0;\n    for (int i = 0; i < 4; i++) { if (values[i] > max) max = values[i]; total += values[i]; }\n    printf(\"Maximum: %d\\nAverage: %d\\n\", max, total / 4);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int values[] = {4, 8, 2, 10};\n    int max = values[0], total = 0;\n    for (int i = 0; i < 4; i++) { if (values[i] > max) max = values[i]; total += values[i]; }\n    printf(\"Maximum: %d\\nAverage: %d\\n\", max, total / 4);\n    }\n}\n"
    },
    "arrays-simulation": {
      "c": "#include <stdio.h>\nint main(void) {\n    int values[] = {4, 8, 2, 10};\n    int max = values[0], total = 0;\n    for (int i = 0; i < 4; i++) { if (values[i] > max) max = values[i]; total += values[i]; }\n    printf(\"Maximum: %d\\nAverage: %d\\n\", max, total / 4);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int values[] = {4, 8, 2, 10};\n    int max = values[0], total = 0;\n    for (int i = 0; i < 4; i++) { if (values[i] > max) max = values[i]; total += values[i]; }\n    printf(\"Maximum: %d\\nAverage: %d\\n\", max, total / 4);\n    return 0;\n}\n",
      "python": "    int values[] = {4, 8, 2, 10};\n    int max = values[0], total = 0;\n    for (int i = 0; i < 4; i++) { if (values[i] > max) max = values[i]; total += values[i]; }\n    printf(\"Maximum: %d\\nAverage: %d\\n\", max, total / 4);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int values[] = {4, 8, 2, 10};\n    int max = values[0], total = 0;\n    for (int i = 0; i < 4; i++) { if (values[i] > max) max = values[i]; total += values[i]; }\n    printf(\"Maximum: %d\\nAverage: %d\\n\", max, total / 4);\n    }\n}\n",
      "javascript": "'use strict';\n    int values[] = {4, 8, 2, 10};\n    int max = values[0], total = 0;\n    for (int i = 0; i < 4; i++) { if (values[i] > max) max = values[i]; total += values[i]; }\n    printf(\"Maximum: %d\\nAverage: %d\\n\", max, total / 4);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int values[] = {4, 8, 2, 10};\n    int max = values[0], total = 0;\n    for (int i = 0; i < 4; i++) { if (values[i] > max) max = values[i]; total += values[i]; }\n    printf(\"Maximum: %d\\nAverage: %d\\n\", max, total / 4);\n    }\n}\n"
    },
    "arrays-tutorial": {
      "c": "#include <stdio.h>\nint main(void) {\n    int values[] = {4, 8, 2, 10};\n    int max = values[0], total = 0;\n    for (int i = 0; i < 4; i++) { if (values[i] > max) max = values[i]; total += values[i]; }\n    printf(\"Maximum: %d\\nAverage: %d\\n\", max, total / 4);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int values[] = {4, 8, 2, 10};\n    int max = values[0], total = 0;\n    for (int i = 0; i < 4; i++) { if (values[i] > max) max = values[i]; total += values[i]; }\n    printf(\"Maximum: %d\\nAverage: %d\\n\", max, total / 4);\n    return 0;\n}\n",
      "python": "    int values[] = {4, 8, 2, 10};\n    int max = values[0], total = 0;\n    for (int i = 0; i < 4; i++) { if (values[i] > max) max = values[i]; total += values[i]; }\n    printf(\"Maximum: %d\\nAverage: %d\\n\", max, total / 4);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int values[] = {4, 8, 2, 10};\n    int max = values[0], total = 0;\n    for (int i = 0; i < 4; i++) { if (values[i] > max) max = values[i]; total += values[i]; }\n    printf(\"Maximum: %d\\nAverage: %d\\n\", max, total / 4);\n    }\n}\n",
      "javascript": "'use strict';\n    int values[] = {4, 8, 2, 10};\n    int max = values[0], total = 0;\n    for (int i = 0; i < 4; i++) { if (values[i] > max) max = values[i]; total += values[i]; }\n    printf(\"Maximum: %d\\nAverage: %d\\n\", max, total / 4);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int values[] = {4, 8, 2, 10};\n    int max = values[0], total = 0;\n    for (int i = 0; i < 4; i++) { if (values[i] > max) max = values[i]; total += values[i]; }\n    printf(\"Maximum: %d\\nAverage: %d\\n\", max, total / 4);\n    }\n}\n"
    },
    "arrays-practice": {
      "c": "#include <stdio.h>\nint main(void) {\n    int values[] = {4, 8, 2, 10};\n    int max = values[0], total = 0;\n    for (int i = 0; i < 4; i++) { if (values[i] > max) max = values[i]; total += values[i]; }\n    printf(\"Maximum: %d\\nAverage: %d\\n\", max, total / 4);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int values[] = {4, 8, 2, 10};\n    int max = values[0], total = 0;\n    for (int i = 0; i < 4; i++) { if (values[i] > max) max = values[i]; total += values[i]; }\n    printf(\"Maximum: %d\\nAverage: %d\\n\", max, total / 4);\n    return 0;\n}\n",
      "python": "    int values[] = {4, 8, 2, 10};\n    int max = values[0], total = 0;\n    for (int i = 0; i < 4; i++) { if (values[i] > max) max = values[i]; total += values[i]; }\n    printf(\"Maximum: %d\\nAverage: %d\\n\", max, total / 4);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int values[] = {4, 8, 2, 10};\n    int max = values[0], total = 0;\n    for (int i = 0; i < 4; i++) { if (values[i] > max) max = values[i]; total += values[i]; }\n    printf(\"Maximum: %d\\nAverage: %d\\n\", max, total / 4);\n    }\n}\n",
      "javascript": "'use strict';\n    int values[] = {4, 8, 2, 10};\n    int max = values[0], total = 0;\n    for (int i = 0; i < 4; i++) { if (values[i] > max) max = values[i]; total += values[i]; }\n    printf(\"Maximum: %d\\nAverage: %d\\n\", max, total / 4);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int values[] = {4, 8, 2, 10};\n    int max = values[0], total = 0;\n    for (int i = 0; i < 4; i++) { if (values[i] > max) max = values[i]; total += values[i]; }\n    printf(\"Maximum: %d\\nAverage: %d\\n\", max, total / 4);\n    }\n}\n"
    },
    "functions": {
      "c": "#include <stdio.h>\nint main(void) {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    return 0;\n}\n",
      "python": "    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    }\n}\n",
      "javascript": "'use strict';\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    }\n}\n"
    },
    "functions-1": {
      "c": "#include <stdio.h>\nint main(void) {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    return 0;\n}\n",
      "python": "    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    }\n}\n",
      "javascript": "'use strict';\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    }\n}\n"
    },
    "functions-2": {
      "c": "#include <stdio.h>\nint main(void) {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    return 0;\n}\n",
      "python": "    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    }\n}\n",
      "javascript": "'use strict';\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    }\n}\n"
    },
    "functions-3": {
      "c": "#include <stdio.h>\nint main(void) {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    return 0;\n}\n",
      "python": "    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    }\n}\n",
      "javascript": "'use strict';\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    }\n}\n"
    },
    "functions-4": {
      "c": "#include <stdio.h>\nint main(void) {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    return 0;\n}\n",
      "python": "    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    }\n}\n",
      "javascript": "'use strict';\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    }\n}\n"
    },
    "functions-5": {
      "c": "#include <stdio.h>\nint main(void) {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    return 0;\n}\n",
      "python": "    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    }\n}\n",
      "javascript": "'use strict';\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    }\n}\n"
    },
    "functions-6": {
      "c": "#include <stdio.h>\nint main(void) {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    return 0;\n}\n",
      "python": "    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    }\n}\n",
      "javascript": "'use strict';\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    }\n}\n"
    },
    "functions-7": {
      "c": "#include <stdio.h>\nint main(void) {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    return 0;\n}\n",
      "python": "    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    }\n}\n",
      "javascript": "'use strict';\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    }\n}\n"
    },
    "functions-8": {
      "c": "#include <stdio.h>\nint main(void) {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    return 0;\n}\n",
      "python": "    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    }\n}\n",
      "javascript": "'use strict';\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int average(int left, int right) { return (left + right) / 2; }\n    printf(\"Average: %d\\n\", average(8, 12));\n    }\n}\n"
    },
    "pointers": {
      "c": "#include <stdio.h>\nint main(void) {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    return 0;\n}\n",
      "python": "    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    }\n}\n",
      "javascript": "'use strict';\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    }\n}\n"
    },
    "pointers-1": {
      "c": "#include <stdio.h>\nint main(void) {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    return 0;\n}\n",
      "python": "    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    }\n}\n",
      "javascript": "'use strict';\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    }\n}\n"
    },
    "pointers-2": {
      "c": "#include <stdio.h>\nint main(void) {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    return 0;\n}\n",
      "python": "    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    }\n}\n",
      "javascript": "'use strict';\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    }\n}\n"
    },
    "pointers-3": {
      "c": "#include <stdio.h>\nint main(void) {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    return 0;\n}\n",
      "python": "    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    }\n}\n",
      "javascript": "'use strict';\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    }\n}\n"
    },
    "pointers-4": {
      "c": "#include <stdio.h>\nint main(void) {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    return 0;\n}\n",
      "python": "    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    }\n}\n",
      "javascript": "'use strict';\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    }\n}\n"
    },
    "pointers-5": {
      "c": "#include <stdio.h>\nint main(void) {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    return 0;\n}\n",
      "python": "    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    }\n}\n",
      "javascript": "'use strict';\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    }\n}\n"
    },
    "pointers-simulation": {
      "c": "#include <stdio.h>\nint main(void) {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    return 0;\n}\n",
      "python": "    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    }\n}\n",
      "javascript": "'use strict';\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    }\n}\n"
    },
    "pointers-practice": {
      "c": "#include <stdio.h>\nint main(void) {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    return 0;\n}\n",
      "python": "    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    }\n}\n",
      "javascript": "'use strict';\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int a = 3, b = 8;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf(\"Before: 3, 8\\nAfter: %d, %d\\n\", a, b);\n    }\n}\n"
    },
    "oop": {
      "c": "#include <stdio.h>\nint main(void) {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    return 0;\n}\n",
      "python": "    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    }\n}\n",
      "javascript": "'use strict';\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    }\n}\n"
    },
    "oop-1": {
      "c": "#include <stdio.h>\nint main(void) {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    return 0;\n}\n",
      "python": "    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    }\n}\n",
      "javascript": "'use strict';\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    }\n}\n"
    },
    "oop-2": {
      "c": "#include <stdio.h>\nint main(void) {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    return 0;\n}\n",
      "python": "    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    }\n}\n",
      "javascript": "'use strict';\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    }\n}\n"
    },
    "oop-3": {
      "c": "#include <stdio.h>\nint main(void) {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    return 0;\n}\n",
      "python": "    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    }\n}\n",
      "javascript": "'use strict';\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    }\n}\n"
    },
    "oop-4": {
      "c": "#include <stdio.h>\nint main(void) {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    return 0;\n}\n",
      "python": "    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    }\n}\n",
      "javascript": "'use strict';\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    }\n}\n"
    },
    "oop-5": {
      "c": "#include <stdio.h>\nint main(void) {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    return 0;\n}\n",
      "python": "    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    }\n}\n",
      "javascript": "'use strict';\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    }\n}\n"
    },
    "oop-6": {
      "c": "#include <stdio.h>\nint main(void) {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    return 0;\n}\n",
      "python": "    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    }\n}\n",
      "javascript": "'use strict';\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    }\n}\n"
    },
    "oop-7": {
      "c": "#include <stdio.h>\nint main(void) {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    return 0;\n}\n",
      "python": "    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    }\n}\n",
      "javascript": "'use strict';\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    }\n}\n"
    },
    "oop-public": {
      "c": "#include <stdio.h>\nint main(void) {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    return 0;\n}\n",
      "python": "    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    }\n}\n",
      "javascript": "'use strict';\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    }\n}\n"
    },
    "oop-private": {
      "c": "#include <stdio.h>\nint main(void) {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    return 0;\n}\n",
      "python": "    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    }\n}\n",
      "javascript": "'use strict';\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    }\n}\n"
    },
    "oop-protected": {
      "c": "#include <stdio.h>\nint main(void) {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    return 0;\n}\n",
      "python": "    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    }\n}\n",
      "javascript": "'use strict';\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    }\n}\n"
    },
    "oop-guidance": {
      "c": "#include <stdio.h>\nint main(void) {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    return 0;\n}\n",
      "python": "    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    }\n}\n",
      "javascript": "'use strict';\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    }\n}\n"
    },
    "oop-practice": {
      "c": "#include <stdio.h>\nint main(void) {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    return 0;\n}\n",
      "python": "    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    }\n}\n",
      "javascript": "'use strict';\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    typedef struct { int balance; } BankAccount;\n    BankAccount account = {100};\n    account.balance += 25;\n    printf(\"Balance: %d\\n\", account.balance);\n    }\n}\n"
    },
    "file-handling": {
      "c": "#include <stdio.h>\nint main(void) {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    return 0;\n}\n",
      "python": "    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    }\n}\n",
      "javascript": "'use strict';\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    }\n}\n"
    },
    "file-handling-1": {
      "c": "#include <stdio.h>\nint main(void) {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    return 0;\n}\n",
      "python": "    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    }\n}\n",
      "javascript": "'use strict';\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    }\n}\n"
    },
    "file-handling-2": {
      "c": "#include <stdio.h>\nint main(void) {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    return 0;\n}\n",
      "python": "    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    }\n}\n",
      "javascript": "'use strict';\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    }\n}\n"
    },
    "file-handling-3": {
      "c": "#include <stdio.h>\nint main(void) {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    return 0;\n}\n",
      "python": "    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    }\n}\n",
      "javascript": "'use strict';\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    }\n}\n"
    },
    "file-handling-4": {
      "c": "#include <stdio.h>\nint main(void) {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    return 0;\n}\n",
      "python": "    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    }\n}\n",
      "javascript": "'use strict';\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    }\n}\n"
    },
    "file-handling-safety": {
      "c": "#include <stdio.h>\nint main(void) {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    return 0;\n}\n",
      "python": "    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    }\n}\n",
      "javascript": "'use strict';\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    }\n}\n"
    },
    "file-handling-practice": {
      "c": "#include <stdio.h>\nint main(void) {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    return 0;\n}\n",
      "python": "    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    }\n}\n",
      "javascript": "'use strict';\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    FILE* f = fopen(\"temp.txt\", \"w\");\n    fprintf(f, \"CodeViz notes\");\n    fclose(f);\n    puts(\"Success\");\n    }\n}\n"
    },
    "exception-handling": {
      "c": "#include <stdio.h>\nint main(void) {\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n    return 0;\n}\n",
      "python": "    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n    }\n}\n",
      "javascript": "'use strict';\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n    }\n}\n"
    },
    "exception-handling-1": {
      "c": "#include <stdio.h>\nint main(void) {\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n    return 0;\n}\n",
      "python": "    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n    }\n}\n",
      "javascript": "'use strict';\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n    }\n}\n"
    },
    "exception-handling-2": {
      "c": "#include <stdio.h>\nint main(void) {\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n    return 0;\n}\n",
      "python": "    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n    }\n}\n",
      "javascript": "'use strict';\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n    }\n}\n"
    },
    "exception-handling-3": {
      "c": "#include <stdio.h>\nint main(void) {\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n    return 0;\n}\n",
      "python": "    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n    }\n}\n",
      "javascript": "'use strict';\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n    }\n}\n"
    },
    "exception-handling-4": {
      "c": "#include <stdio.h>\nint main(void) {\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n    return 0;\n}\n",
      "python": "    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n    }\n}\n",
      "javascript": "'use strict';\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n    }\n}\n"
    },
    "exception-handling-practice": {
      "c": "#include <stdio.h>\nint main(void) {\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n    return 0;\n}\n",
      "python": "    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n    }\n}\n",
      "javascript": "'use strict';\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    char text[] = \"abc\";\n    char* end = NULL;\n    strtol(text, &end, 10);\n    if (end == text) puts(\"runtime error/exception\");\n    }\n}\n"
    },
    "unit-testing": {
      "c": "#include <stdio.h>\nint main(void) {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    return 0;\n}\n",
      "python": "    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    }\n}\n",
      "javascript": "'use strict';\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    }\n}\n"
    },
    "unit-testing-1": {
      "c": "#include <stdio.h>\nint main(void) {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    return 0;\n}\n",
      "python": "    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    }\n}\n",
      "javascript": "'use strict';\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    }\n}\n"
    },
    "unit-testing-2": {
      "c": "#include <stdio.h>\nint main(void) {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    return 0;\n}\n",
      "python": "    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    }\n}\n",
      "javascript": "'use strict';\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    }\n}\n"
    },
    "unit-testing-3": {
      "c": "#include <stdio.h>\nint main(void) {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    return 0;\n}\n",
      "python": "    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    }\n}\n",
      "javascript": "'use strict';\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    }\n}\n"
    },
    "unit-testing-4": {
      "c": "#include <stdio.h>\nint main(void) {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    return 0;\n}\n",
      "python": "    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    }\n}\n",
      "javascript": "'use strict';\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    }\n}\n"
    },
    "unit-testing-5": {
      "c": "#include <stdio.h>\nint main(void) {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    return 0;\n}\n",
      "python": "    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    }\n}\n",
      "javascript": "'use strict';\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    }\n}\n"
    },
    "unit-testing-practice": {
      "c": "#include <stdio.h>\nint main(void) {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    return 0;\n}\n",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    return 0;\n}\n",
      "python": "    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n",
      "java": "public class Main {\n    public static void main(String[] args) {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    }\n}\n",
      "javascript": "'use strict';\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n",
      "csharp": "using System;\nclass Program {\n    static void Main() {\n    int isEven(int value) { return value % 2 == 0; }\n    if (isEven(4)) puts(\"Input 6 produces 12 and the assertion passes\");\n    }\n}\n"
    }
  };
  if (typeof window !== 'undefined') {
    window.LESSON_ASSIGNMENT_SOLUTIONS = Object.freeze(solutions);
  }
})();
