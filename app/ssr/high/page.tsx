import BuildInfo from '@/components/BuildInfo/BuildInfo';

export const dynamic = 'force-dynamic';

const ELEMENTS_COUNT = 32;

export default async function HighSsr() {
  let arr = [];
  for (let a = 0; a < ELEMENTS_COUNT; a++) {
    for (let b = 0; b < ELEMENTS_COUNT; b++) {
      let nestedArr = [];
      for (let c = 0; c < ELEMENTS_COUNT; c++) {
        nestedArr.push(a * b * c);
      }
      arr.push(nestedArr);
    }
  }

  return (
    <div className="content-container">
      <BuildInfo />
      <span>Length: {arr.length}</span>
      {arr.map((nested, i) => (
        <div id="bucket" key={`outer_${i}`}>
          {nested
            .filter((element) => element !== 0)
            .map((element, j) => (
              <div key={`outer_${i}_${j}`}>Element: {element}</div>
            ))}
        </div>
      ))}
      {/* {posts.map(post => (
                // @ts-expect-error
                <Post key={post.id} post={post} />
            ))} */}
    </div>
  );
}
