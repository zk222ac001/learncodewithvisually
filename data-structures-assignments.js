'use strict';
(() => {
  const chapters = [
    {
      title: 'Array',
      task: 'Modify the example to insert 5 at the front, then calculate and print the sum of every value in the updated array.',
      expected: 'The output includes the updated array and its correct sum.'
    },
    {
      title: 'Linked List',
      task: 'Add a node with value 40 after the head, then traverse the list from head to the end.',
      expected: '10\n40\n20\n30'
    },
    {
      title: 'Stack',
      task: 'Push 40 and then 50. Pop twice and print the removed values in order.',
      expected: '50\n40'
    },
    {
      title: 'Queue',
      task: 'Enqueue 40, dequeue once, then print the removed value and the remaining queue.',
      expected: 'Removed: 10\nRemaining: 20, 30, 40'
    },
    {
      title: 'Tree',
      task: 'Add a new child named exercise.py beneath Python and print every node in preorder.',
      expected: 'The root appears first, followed by Python and its children, then the remaining root branches.'
    },
    {
      title: 'Graph',
      task: 'Run breadth-first search from A. Track visited nodes so a cycle never causes a repeated visit, and print the shortest route to E.',
      expected: 'Each reachable node is printed once; a shortest route from A to E uses two edges.'
    },
    {
      title: 'Hash Table',
      task: 'Store both Bo and Ada with different values, even though the teaching hash function places them in the same bucket. Look up both keys.',
      expected: 'Both original values are returned; adding the second key does not overwrite the first.'
    }
  ];
  const solutions = {
    c: [
      '#include <stdio.h>\n\nint main(void) {\n    int values[] = {10, 20, 30, 40};\n    int length = 4;\n    int expanded[5];\n    expanded[0] = 5;\n    for (int i = 0; i < length; i++) expanded[i + 1] = values[i];\n    int sum = 0;\n    for (int i = 0; i < length + 1; i++) { printf("%d%s", expanded[i], i == length ? "\\n" : ", "); sum += expanded[i]; }\n    printf("Sum: %d\\n", sum);\n    return 0;\n}',
      '#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node { int value; struct Node *next; } Node;\nint main(void) {\n    Node *head = malloc(sizeof *head), *tail = malloc(sizeof *tail), *added = malloc(sizeof *added), *last = malloc(sizeof *last);\n    if (!head || !tail || !added || !last) { free(head); free(tail); free(added); free(last); return 1; }\n    *head = (Node){10, tail}; *tail = (Node){20, last}; *last = (Node){30, NULL}; *added = (Node){40, head->next}; head->next = added;\n    for (Node *node = head; node; node = node->next) printf("%d\\n", node->value);\n    free(last); free(tail); free(added); free(head); return 0;\n}',
      '#include <stdio.h>\nint main(void) { int stack[8], size = 0; stack[size++] = 10; stack[size++] = 20; stack[size++] = 30; stack[size++] = 40; stack[size++] = 50; int first = stack[--size]; int second = stack[--size]; printf("%d\\n%d\\n", first, second); return 0; }',
      '#include <stdio.h>\nint main(void) { int queue[8] = {10, 20, 30}; int size = 3; queue[size++] = 40; int removed = queue[0]; for (int i = 1; i < size; i++) queue[i - 1] = queue[i]; size--; printf("Removed: %d\\nRemaining: ", removed); for (int i = 0; i < size; i++) printf("%s%d", i ? ", " : "", queue[i]); puts(""); return 0; }',
      '#include <stdio.h>\ntypedef struct Node { const char *name; struct Node *child[4]; int count; } Node;\nvoid visit(Node *n) { puts(n->name); for (int i=0;i<n->count;i++) visit(n->child[i]); }\nint main(void) { Node root={"root",{NULL},3}, python={"Python",{NULL},3}, c={"C",{NULL},0}, java={"Java",{NULL},0}, exercise={"exercise.py",{NULL},0}, algorithms={"Algorithms",{NULL},0}, web={"Web",{NULL},0}; root.child[0]=&python; root.child[1]=&algorithms; root.child[2]=&web; python.child[0]=&c; python.child[1]=&java; python.child[2]=&exercise; visit(&root); return 0; }',
      '#include <stdio.h>\nint main(void) { const char *names[]={"A","B","C","D","E"}; int edges[5][5]={{0,1,1,0,0},{0,0,0,1,1},{0,0,0,0,1},{0,0,0,0,1},{0,0,0,0,0}}; int seen[5]={1,0,0,0,0}, parent[5]={-1,-1,-1,-1,-1}, q[5]={0}, front=0, back=1; while(front<back){int u=q[front++]; for(int v=0;v<5;v++) if(edges[u][v]&&!seen[v]){seen[v]=1;parent[v]=u;q[back++]=v;}} printf("Visited:"); for(int i=0;i<back;i++) printf(" %s",names[q[i]]); int path[5],n=0; for(int v=4;v!=-1;v=parent[v]) path[n++]=v; printf("\\nShortest route: "); for(int i=n-1;i>=0;i--) printf("%s%s",i==n-1?"":" -> ",names[path[i]]); puts(""); return 0; }',
      '#include <stdio.h>\n#include <string.h>\ntypedef struct { const char *key; int value; } Entry;\nint main(void) { Entry bucket[2]={{"Bo",10},{"Ada",20}}; int count=2; const char *keys[]={"Bo","Ada"}; for(int k=0;k<2;k++){int found=0; for(int i=0;i<count;i++) if(strcmp(bucket[i].key,keys[k])==0){printf("%s: %d\\n",keys[k],bucket[i].value);found=1;} if(!found) puts("not found");} return 0; }'
    ],
    cpp: [
      '#include <iostream>\n#include <vector>\nint main() { std::vector<int> values{10,20,30,40}; values.insert(values.begin(),5); int sum=0; for(int value:values){std::cout<<value<<(value==values.back()?"\\n":", ");sum+=value;} std::cout<<"Sum: "<<sum<<\'\\n\'; }',
      '#include <iostream>\nstruct Node { int value; Node *next; };\nint main() { Node n4{30,nullptr}, n3{20,&n4}, n2{40,&n3}, head{10,&n2}; for(Node *p=&head;p;p=p->next) std::cout<<p->value<<\'\\n\'; }',
      '#include <iostream>\n#include <stack>\nint main(){std::stack<int>s;for(int x:{10,20,30,40,50})s.push(x);for(int i=0;i<2;i++){std::cout<<s.top()<<\'\\n\';s.pop();}}',
      '#include <iostream>\n#include <queue>\nint main(){std::queue<int>q;for(int x:{10,20,30,40})q.push(x);std::cout<<"Removed: "<<q.front()<<\'\\n\';q.pop();std::cout<<"Remaining: ";bool first=true;while(!q.empty()){if(!first)std::cout<<", ";first=false;std::cout<<q.front();q.pop();}std::cout<<\'\\n\';}',
      '#include <iostream>\n#include <vector>\n#include <string>\nstruct Node{std::string name;std::vector<Node*>children;explicit Node(std::string value):name(value){}};void visit(Node*n){std::cout<<n->name<<\'\\n\';for(auto*c:n->children)visit(c);}int main(){Node root{"root"},python{"Python"},c{"C"},java{"Java"},exercise{"exercise.py"},algorithms{"Algorithms"},web{"Web"};root.children={&python,&algorithms,&web};python.children={&c,&java,&exercise};visit(&root);}',
      '#include <iostream>\n#include <vector>\n#include <queue>\n#include <string>\nint main(){std::vector<std::vector<int>>g={{1,2},{3,4},{4},{4},{}};std::vector<bool>seen(5);std::vector<int>parent(5,-1);std::queue<int>q;q.push(0);seen[0]=true;std::cout<<"Visited:";while(!q.empty()){int u=q.front();q.pop();std::cout<<" "<<char(\'A\'+u);for(int v:g[u])if(!seen[v]){seen[v]=true;parent[v]=u;q.push(v);}}std::vector<int>p;for(int v=4;v!=-1;v=parent[v])p.push_back(v);std::cout<<"\\nShortest route: ";for(auto i=p.rbegin();i!=p.rend();++i)std::cout<<(i==p.rbegin()?"":" -> ")<<char(\'A\'+*i);std::cout<<\'\\n\';}',
      '#include <iostream>\n#include <vector>\n#include <string>\nstruct Entry{std::string key;int value;};int main(){std::vector<Entry>bucket{{"Bo",10},{"Ada",20}};for(const std::string key:{"Bo","Ada"})for(const auto&e:bucket)if(e.key==key)std::cout<<key<<": "<<e.value<<\'\\n\';}'
    ],
    python: [
      'values = [10, 20, 30, 40]\nvalues.insert(0, 5)\nprint("Updated array:", values)\nprint("Sum:", sum(values))',
      'class Node:\n    def __init__(self, value, next_node=None):\n        self.value = value\n        self.next = next_node\n\nhead = Node(10, Node(20, Node(30)))\nhead.next = Node(40, head.next)\ncurrent = head\nwhile current:\n    print(current.value)\n    current = current.next',
      'stack = [10, 20, 30]\nstack.append(40)\nstack.append(50)\nprint(stack.pop())\nprint(stack.pop())',
      'from collections import deque\nqueue = deque([10, 20, 30])\nqueue.append(40)\nremoved = queue.popleft()\nprint(f"Removed: {removed}")\nprint("Remaining:", ", ".join(map(str, queue)))',
      'class Node:\n    def __init__(self, name, children=None):\n        self.name = name\n        self.children = children or []\n\ndef preorder(node):\n    print(node.name)\n    for child in node.children:\n        preorder(child)\n\nroot = Node("root", [Node("Python", [Node("variables"), Node("loops"), Node("exercise.py")]), Node("Algorithms"), Node("Web")])\npreorder(root)',
      'from collections import deque\n\ngraph = {"A": ["B", "C"], "B": ["D", "E"], "C": ["E"], "D": ["E"], "E": []}\nqueue = deque(["A"])\nparent = {"A": None}\norder = []\nwhile queue:\n    node = queue.popleft()\n    order.append(node)\n    for neighbor in graph[node]:\n        if neighbor not in parent:\n            parent[neighbor] = node\n            queue.append(neighbor)\npath = []\nnode = "E"\nwhile node is not None:\n    path.append(node)\n    node = parent[node]\nprint("Visited:", " ".join(order))\nprint("Shortest route:", " -> ".join(reversed(path)))',
      'bucket = [("Bo", 10), ("Ada", 20)]  # Both entries intentionally share bucket 0.\nfor key in ("Bo", "Ada"):\n    value = next(value for stored_key, value in bucket if stored_key == key)\n    print(f"{key}: {value}")'
    ],
    java: [
      'import java.util.Arrays;\npublic class Main { public static void main(String[] args) { int[] values={10,20,30,40}; int[] updated=new int[values.length+1]; updated[0]=5; System.arraycopy(values,0,updated,1,values.length); int sum=0; for(int value:updated){System.out.print(value+(value==updated[updated.length-1]?"\\n":", "));sum+=value;} System.out.println("Sum: "+sum); } }',
      'public class Main { static class Node { int value; Node next; Node(int v,Node n){value=v;next=n;} } public static void main(String[] args){Node head=new Node(10,new Node(20,new Node(30,null)));head.next=new Node(40,head.next);for(Node n=head;n!=null;n=n.next)System.out.println(n.value);} }',
      'import java.util.ArrayDeque;\npublic class Main { public static void main(String[] args){ArrayDeque<Integer>s=new ArrayDeque<>();for(int x:new int[]{10,20,30,40,50})s.push(x);System.out.println(s.pop());System.out.println(s.pop());} }',
      'import java.util.ArrayDeque;\npublic class Main { public static void main(String[] args){ArrayDeque<Integer>q=new ArrayDeque<>();for(int x:new int[]{10,20,30})q.add(x);q.add(40);int removed=q.remove();System.out.println("Removed: "+removed);System.out.print("Remaining: ");System.out.println(String.join(", ",q.stream().map(String::valueOf).toList()));} }',
      'import java.util.*;\npublic class Main { static class Node{String name;List<Node>children=new ArrayList<>();Node(String n,Node...c){name=n;children.addAll(List.of(c));}}static void preorder(Node n){System.out.println(n.name);for(Node c:n.children)preorder(c);}public static void main(String[]args){preorder(new Node("root",new Node("Python",new Node("variables"),new Node("loops"),new Node("exercise.py")),new Node("Algorithms"),new Node("Web")));} }',
      'import java.util.*;\npublic class Main { public static void main(String[]args){List<List<Integer>>g=List.of(List.of(1,2),List.of(3,4),List.of(4),List.of(4),List.of());boolean[]seen=new boolean[5];int[]parent={-1,-1,-1,-1,-1};Queue<Integer>q=new ArrayDeque<>();q.add(0);seen[0]=true;List<Integer>order=new ArrayList<>();while(!q.isEmpty()){int u=q.remove();order.add(u);for(int v:g.get(u))if(!seen[v]){seen[v]=true;parent[v]=u;q.add(v);}}System.out.print("Visited:");for(int v:order)System.out.print(" "+(char)(\'A\'+v));List<Integer>path=new ArrayList<>();for(int v=4;v!=-1;v=parent[v])path.add(v);Collections.reverse(path);System.out.print("\\nShortest route: ");for(int i=0;i<path.size();i++)System.out.print((i==0?"":" -> ")+(char)(\'A\'+path.get(i)));System.out.println();} }',
      'import java.util.*;\npublic class Main { static class Entry{String key;int value;Entry(String key,int value){this.key=key;this.value=value;}}public static void main(String[]args){List<Entry>bucket=List.of(new Entry("Bo",10),new Entry("Ada",20));for(String key:List.of("Bo","Ada"))for(Entry e:bucket)if(e.key.equals(key))System.out.println(key+": "+e.value);} }'
    ],
    javascript: [
      "'use strict';\nconst values = [10, 20, 30, 40];\nvalues.unshift(5);\nconsole.log('Updated array:', values);\nconsole.log('Sum:', values.reduce((total, value) => total + value, 0));",
      "'use strict';\nclass Node { constructor(value, next = null) { this.value = value; this.next = next; } }\nconst head = new Node(10, new Node(20, new Node(30)));\nhead.next = new Node(40, head.next);\nfor (let node = head; node; node = node.next) console.log(node.value);",
      "'use strict';\nconst stack = [10, 20, 30];\nstack.push(40, 50);\nconsole.log(stack.pop());\nconsole.log(stack.pop());",
      "'use strict';\nconst queue = [10, 20, 30];\nqueue.push(40);\nconst removed = queue.shift();\nconsole.log(`Removed: ${removed}`);\nconsole.log(`Remaining: ${queue.join(', ')}`);",
      "'use strict';\nclass Node { constructor(name, children = []) { this.name = name; this.children = children; } }\nfunction preorder(node) { console.log(node.name); for (const child of node.children) preorder(child); }\nconst root = new Node('root', [new Node('Python', [new Node('variables'), new Node('loops'), new Node('exercise.py')]), new Node('Algorithms'), new Node('Web')]);\npreorder(root);",
      "'use strict';\nconst graph = { A: ['B', 'C'], B: ['D', 'E'], C: ['E'], D: ['E'], E: [] };\nconst queue = ['A'], parent = new Map([['A', null]]), order = [];\nfor (let i = 0; i < queue.length; i++) { const node = queue[i]; order.push(node); for (const next of graph[node]) if (!parent.has(next)) { parent.set(next, node); queue.push(next); } }\nconst path = []; for (let node = 'E'; node !== null; node = parent.get(node)) path.push(node);\nconsole.log(`Visited: ${order.join(' ')}`);\nconsole.log(`Shortest route: ${path.reverse().join(' -> ')}`);",
      "'use strict';\nconst bucket = [{ key: 'Bo', value: 10 }, { key: 'Ada', value: 20 }]; // Both intentionally use bucket 0.\nfor (const key of ['Bo', 'Ada']) { const entry = bucket.find(item => item.key === key); console.log(`${key}: ${entry.value}`); }"
    ],
    csharp: [
      'using System;\nusing System.Linq;\nclass Program { static void Main(){int[] values={10,20,30,40};int[] updated=new int[values.Length+1];updated[0]=5;Array.Copy(values,0,updated,1,values.Length);Console.WriteLine("Updated array: "+string.Join(", ",updated));Console.WriteLine("Sum: "+updated.Sum());} }',
      'using System;\nclass Node { public int Value; public Node Next; public Node(int value,Node next=null){Value=value;Next=next;} }\nclass Program { static void Main(){var head=new Node(10,new Node(20,new Node(30)));head.Next=new Node(40,head.Next);for(var n=head;n!=null;n=n.Next)Console.WriteLine(n.Value);} }',
      'using System;\nusing System.Collections.Generic;\nclass Program { static void Main(){var stack=new Stack<int>(new[]{30,20,10});stack.Push(40);stack.Push(50);Console.WriteLine(stack.Pop());Console.WriteLine(stack.Pop());} }',
      'using System;\nusing System.Collections.Generic;\nclass Program { static void Main(){var queue=new Queue<int>(new[]{10,20,30});queue.Enqueue(40);int removed=queue.Dequeue();Console.WriteLine($"Removed: {removed}");Console.WriteLine($"Remaining: {string.Join(", ",queue)}");} }',
      'using System;\nusing System.Collections.Generic;\nclass Node { public string Name; public List<Node> Children=new(); public Node(string name,params Node[] children){Name=name;Children.AddRange(children);} }\nclass Program { static void Preorder(Node node){Console.WriteLine(node.Name);foreach(var child in node.Children)Preorder(child);}static void Main(){Preorder(new Node("root",new Node("Python",new Node("variables"),new Node("loops"),new Node("exercise.py")),new Node("Algorithms"),new Node("Web")));} }',
      'using System;\nusing System.Collections.Generic;\nclass Program { static void Main(){var graph=new Dictionary<char,char[]>{{\'A\',new[]{\'B\',\'C\'}},{\'B\',new[]{\'D\',\'E\'}},{\'C\',new[]{\'E\'}},{\'D\',new[]{\'E\'}},{\'E\',Array.Empty<char>()}};var queue=new Queue<char>();var parent=new Dictionary<char,char?>{{\'A\',null}};queue.Enqueue(\'A\');var order=new List<char>();while(queue.Count>0){char node=queue.Dequeue();order.Add(node);foreach(char next in graph[node])if(!parent.ContainsKey(next)){parent[next]=node;queue.Enqueue(next);}}var path=new List<char>();char? current=\'E\';while(current.HasValue){path.Add(current.Value);current=parent[current.Value];}path.Reverse();Console.WriteLine("Visited: "+string.Join(" ",order));Console.WriteLine("Shortest route: "+string.Join(" -> ",path));} }',
      'using System;\nusing System.Collections.Generic;\nclass Entry { public string Key; public int Value; public Entry(string key,int value){Key=key;Value=value;} }\nclass Program { static void Main(){var bucket=new List<Entry>{new Entry("Bo",10),new Entry("Ada",20)};foreach(string key in new[]{"Bo","Ada"}){var entry=bucket.Find(item=>item.Key==key);Console.WriteLine($"{key}: {entry.Value}");}} }'
    ]
  };
  window.DATA_STRUCTURE_ASSIGNMENT_SOLUTIONS = solutions;

  function enhance() {
    const content = document.getElementById('content');
    const lower = content?.querySelector('.lower');
    const active = document.querySelector('#nav button[aria-current="page"]');
    if (!content || !lower || !active) return;
    const index = [...document.querySelectorAll('#nav button')].indexOf(active);
    const chapter = chapters[index];
    if (!chapter) return;
    const existing = content.querySelector('[data-structure-assignment]');
    if (existing?.dataset.structureAssignment === String(index)) {
      const code = existing.querySelector('[data-structure-solution-code]');
      const codeLanguage = document.getElementById('code-language')?.value || 'python';
      const solution = solutions[codeLanguage]?.[index];
      if (code && solution && code.textContent !== solution) code.textContent = solution;
      return;
    }
    existing?.remove();
    const panel = document.createElement('section');
    panel.className = 'card assignment-card';
    panel.dataset.structureAssignment = String(index);
    panel.lang = 'en';
    panel.dir = 'ltr';
    const codeLanguage = document.getElementById('code-language')?.value || 'python';
    const solution = solutions[codeLanguage]?.[index];
    if (!solution) throw new Error(`Data structures assignment solution is missing for ${codeLanguage}.`);
    panel.innerHTML = `<p class="eyebrow">Coding assignment · ${chapter.title}</p><h2>Task</h2><p>${chapter.task}</p><h3>Expected outcome</h3><pre class="code">${chapter.expected}</pre><div class="controls"><button type="button" class="primary" data-structure-assignment-run="${index}">Open example in online editor →</button><button type="button" class="primary" data-structure-assignment-solution="${index}" aria-expanded="false" aria-controls="structure-solution-${index}">Solution of code</button></div><section class="assignment-solution" id="structure-solution-${index}" hidden><h3>Solution of code</h3><pre class="code"><code data-structure-solution-code></code></pre></section><p class="muted">Edit the example, run it in OneCompiler, and compare the result with this check. Instructions are in English.</p>`;
    panel.querySelector('[data-structure-solution-code]').textContent = solution;
    lower.insertAdjacentElement('afterend', panel);
  }

  const content = document.getElementById('content');
  if (!content) throw new Error('Data structures lesson content is missing.');
  new MutationObserver(enhance).observe(content, { childList: true, subtree: true });
  enhance();
  content.addEventListener('click', event => {
    const solutionButton = event.target.closest('[data-structure-assignment-solution]');
    if (solutionButton) {
      const index = solutionButton.dataset.structureAssignmentSolution;
      const panel = document.getElementById(`structure-solution-${index}`);
      if (!panel) throw new Error('Data structures assignment solution panel is missing.');
      const open = solutionButton.getAttribute('aria-expanded') !== 'true';
      panel.hidden = !open;
      solutionButton.setAttribute('aria-expanded', String(open));
      solutionButton.textContent = open ? 'Hide solution' : 'Solution of code';
      return;
    }
    const button = event.target.closest('[data-structure-assignment-run]');
    if (!button) return;
    const chapter = chapters[Number(button.dataset.structureAssignmentRun)];
    const codeLanguage = document.getElementById('code-language')?.value;
    const language = document.getElementById('language')?.value;
    const example = content.querySelector('.lower .card:nth-child(2) code')?.textContent;
    const program = window.COURSE_DATA.programs[codeLanguage];
    if (!chapter || !program || !example) throw new Error('Could not prepare the data structures assignment.');
    window.CodeRunner.open({
      language,
      codeLanguage,
      filename: program.filename || `structures-assignment.${program.ext}`,
      code: example,
      label: 'Assignment · ' + chapter.title
    });
  });
})();
