import { RequestInfo } from "rwsdk/worker";
import { VIBES } from "../lib/vibes";
import { CONSTANTS } from "../lib/constants";
import { env } from "cloudflare:workers";

const BASE_URL = env.BASE_URL;

const DEMO_INPUTS = [
  "amy@redwoodjs.com",
  "cfb7e828-a90f-4ed1-a818-a20241ac4e73",
  "bfca8292-3dea-4458-9af5-49bd0fdb4426",
  "user123",
];

// Get all vibe names dynamically from the VIBES object
const VIBE_NAMES = Object.keys(VIBES);

export function Home({ ctx }: RequestInfo) {
  // create an array of 10 random UUIDs
  const randomUuid = crypto.randomUUID();
  const randomUuids = Array.from({ length: 9 }, () => crypto.randomUUID());

  return (
    <main>
      {/* GITHUB CORNER */}
      <a href={CONSTANTS.BASE_URL}>
        <img
          src="/images/github-corner.svg"
          alt="GitHub"
          className="github-corner"
        />
      </a>

      {/* RWSDK AD */}
      <a className="ad" href={CONSTANTS.RWSDK} target="_blank">
        <p>Built with</p>
        <img src="/images/sdk-logo.svg" alt="RWSDK" width="150" />
      </a>

      <div>
        <h1>RWSDK Avatars</h1>
        <h2>Deterministic avatars with good vibes.</h2>

        <ul className="examples">
          <li>
            <img src={BASE_URL + DEMO_INPUTS[0]} alt="" className="avatar" />
            <div>
              {BASE_URL}
              {DEMO_INPUTS[0]}
            </div>
          </li>
          <li>
            <img src={BASE_URL + randomUuid} alt="" className="avatar" />
            <div>
              {BASE_URL}
              {randomUuid}
            </div>
          </li>
          {randomUuids.map((uuid, i) => (
            <li key={uuid}>
              <img
                src={BASE_URL + uuid + `?vibe=${VIBE_NAMES[i]}`}
                alt=""
                className="avatar"
              />
              <div>
                {BASE_URL}
                {uuid}
                ?vibe={VIBE_NAMES[i]}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
