const os = require("os");
const path = require("node:path");

module.exports = {
    getPath(includeVersion = true) {
        const _osVersion = os.release();

        const plat = process.platform;
        const arch = process.env.LEVELDB_ZLIB_ARCH_OVERRIDE || process.arch;
        const ver = _osVersion.split(".", 1);

        const bpath = `./prebuilds/${plat}${includeVersion ? `-${ver}` : ""}-${arch}/`;
        return bpath;
    },

    /**
     *
     * @param {string[]} paths
     * @return {string | null}
     */
    findMostSimilarPath(paths) {
        const _osVersion = os.release();

        const plat = process.platform;
        const arch = process.env.LEVELDB_ZLIB_ARCH_OVERRIDE || process.arch;
        const ver = _osVersion.split(".", 1)[0];

        const pathEnds = paths.map((p) => path.basename(p));

        return pathEnds.reduce(
            /**
             *
             * @param {string | null} previousPath
             * @param {string} currentPath
             * @returns {string | null}
             */
            (previousPath, currentPath) => {
                const parts = currentPath.split("-");
                const prevParts = previousPath?.split("-") ?? null;
                let [platPart, verPart, archPart] = parts.length === 2 ? [parts[0], null, parts[1]] : parts;
                let [prevPlatPart, prevVerPart, prevArchPart] =
                    prevParts === null ? [] : prevParts.length === 2 ? [prevParts[0], null, prevParts[1]] : prevParts;
                if (platPart !== plat) return previousPath;
                if (archPart !== arch) return previousPath;
                if (previousPath !== null && verPart !== null && verPart !== ver && (prevVerPart === null || prevVerPart === ver)) return previousPath;
                if (verPart === null && prevVerPart === ver) return previousPath;
                const verPartNum = Number(verPart);
                const prevVerPartNum = Number(prevVerPart);
                if (verPart === null && (previousPath === null || (prevVerPart !== null && prevVerPart !== ver))) return currentPath;
                if (previousPath !== null && isNaN(verPartNum) && isNaN(prevVerPartNum)) return previousPath;
                if (previousPath !== null && isNaN(verPartNum) && !isNaN(prevVerPartNum)) return previousPath;
                if (previousPath !== null && !isNaN(verPartNum) && isNaN(prevVerPartNum)) return currentPath;
                if (previousPath !== null && Math.abs(verPartNum - Number(ver)) < Math.abs(prevVerPartNum - Number(ver))) return currentPath;
                return previousPath ?? currentPath;
            },
            null
        ) ?? null;
    },

    getPlatformString(includeVersion = true) {
        const _osVersion = os.release();

        const plat = process.platform;
        const arch = process.env.LEVELDB_ZLIB_ARCH_OVERRIDE || process.arch;
        const ver = _osVersion.split(".", 1);
        return `${plat}${includeVersion ? `-${ver}` : ""}-${arch}`;
    },
};

