/**
 * Spotify data for the Now dashboard.
 *
 * Components only depend on the types in this file. To go live, implement
 * getLiveSpotify() and switch getSpotify() to call it; no UI code changes.
 */

export interface SpotifyTrack {
  title: string;
  artist: string;
  albumArtUrl: string | null;
  /** Link to the track on Spotify. */
  url: string | null;
  durationMs: number;
}

export interface SpotifyNowPlaying {
  /** False while the track is mock data. Drives the MOCK DATA chip. */
  live: boolean;
  isPlaying: boolean;
  /** Playback position when the data was fetched. */
  progressMs: number;
  /** Null when nothing is playing and there is no recent track. */
  track: SpotifyTrack | null;
}

export function getMockSpotify(): SpotifyNowPlaying {
  return {
    live: false,
    isPlaying: true,
    progressMs: 58_000,
    track: {
      // Placeholders on purpose: the real track comes from the API.
      title: "[Track title]",
      artist: "[Artist]",
      albumArtUrl: null,
      url: null,
      durationMs: 192_000,
    },
  };
}

export async function getLiveSpotify(): Promise<SpotifyNowPlaying> {
  // TODO(kalsah): wire API. /v1/me/player/currently-playing, falling back to
  // /v1/me/player/recently-played with isPlaying: false.
  throw new Error("getLiveSpotify() is not implemented yet");
}

/** The single entry point the page uses. */
export async function getSpotify(): Promise<SpotifyNowPlaying> {
  // TODO(kalsah): switch to `return getLiveSpotify()` once it is implemented.
  return getMockSpotify();
}
