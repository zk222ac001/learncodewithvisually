'use strict';
// Stable milestone IDs preserve progress as new lessons are added.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.CodeVizPaths = factory();
})(typeof window === 'undefined' ? globalThis : window, () => {
  const languages = { c: 'C', cpp: 'C++', python: 'Python', java: 'Java', javascript: 'JavaScript', csharp: 'C#' };
  const foundations = [
    ['intro', 'Start programming', 'Understand programs, run examples and write Hello World.'],
    ['data', 'Variables and data types', 'Store values, read input and explore expressions.'],
    ['control', 'Make decisions', 'Practice conditions and selection.'],
    ['module-loops', 'Repeat with loops', 'Trace repetition and practice loop exercises. Detailed for-loop simulation uses C.'],
    ['arrays', 'Organize values', 'Explore arrays and collections. Detailed simulation and quiz use C.'],
    ['functions', 'Build reusable functions', 'Use parameters, return values and a language-specific quiz.'],
    ['file-handling', 'Work with files', 'Read and write data using examples in your selected language.'],
    ['unit-testing', 'Check your code', 'Practice assertions and testing with examples and exercises.']
  ];
  const paths = Object.entries(languages).map(([id, title]) => ({ id, title, description: `Build your ${title} foundations with the existing visual course.`, milestones: foundations.map(([lesson, title, description]) => ({
    id: lesson, title, description, page: 'index.html', hash: lesson,
    progressId: ['file-handling', 'unit-testing'].includes(lesson) ? `${lesson}-en-v1` : lesson === 'functions' ? `functions-${id}-en-v1` : id === 'c' && lesson === 'module-loops' ? 'for-c-en-v1' : id === 'c' && lesson === 'arrays' ? 'arrays-c-en-v1' : `path-${id}-${lesson}-v1`
  })) }));
  paths.find(p => p.id === 'c').milestones.splice(6, 0, { id: 'pointers', title: 'Understand pointers', description: 'Trace addresses, dereferencing and memory with the C tutorial.', page: 'index.html', hash: 'pointers', progressId: 'pointers-c-en-v1' });
  paths.push({ id: 'data-structures', title: 'Data structures', description: 'See how data is organized, accessed and changed. Choose any example language.', milestones: ['Arrays', 'Linked lists', 'Stacks', 'Queues', 'Trees', 'Graphs', 'Hash tables', 'Compare structures', 'Check your understanding'].map((title, chapter) => ({ id: `chapter-${chapter}`, title, description: chapter === 8 ? 'Complete the seven-question practice quiz, then mark this milestone complete.' : 'Explore the visualizer, code examples and exercises.', page: 'datastrukturer.html', chapter, progressId: `path-data-structures-${chapter}-v1` })) });
  function summary(path, store) {
    const completed = path.milestones.filter(m => store.get(m.progressId).completed).length;
    return { completed, total: path.milestones.length, next: path.milestones.find(m => !store.get(m.progressId).completed) || null };
  }
  function lessonURL(path, milestone, locale = 'en', exampleLanguage = 'python') {
    const query = new URLSearchParams({ lang: locale, code: path.id === 'data-structures' ? exampleLanguage : path.id });
    if (milestone.chapter !== undefined) query.set('chapter', milestone.chapter);
    return `${milestone.page}?${query}${milestone.hash ? '#' + milestone.hash : ''}`;
  }
  return { paths, languages, summary, lessonURL };
});
