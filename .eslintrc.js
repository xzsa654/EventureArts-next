/**
 * ＊＊＊ EventureArts 專案 ESLint 設定(此檔案會強制開啟alias)
 * 
 * ＊＊＊目的：
 * - 解決 three.js examples 模組報錯問題
 * - 正確支援 @ 路徑 alias
 * - 改善無障礙檢查 (a11y)，將無字幕警告調整為提示
 * 
 * ＊＊＊注意：
 * - 本設定會影響整個專案，請確認同步給團隊其他人
 * - 若有新增特殊路徑或模組，也可在此擴充忽略列表
 */

module.exports = {
  extends: [
    "next/core-web-vitals",
  ],
  rules: {
    /**
     *  解決 three.js examples modules 報錯
     * 原因：three/examples 並非標準模組導出，ESLint 靜態分析無法正確解析
     */
    "import/no-unresolved": [
      "error",
      {
        ignore: [
          "three/examples/jsm/controls/OrbitControls",
          "three/examples/jsm/loaders/OBJLoader",
          "three/examples/jsm/loaders/PLYLoader",
          "three/examples/jsm/loaders/GLTFLoader",
          "three/examples/jsm/loaders/PCDLoader",
        ],
      },
    ],
    
    /**
     * 無障礙 (a11y) 改善
     * 將影片無字幕檢查調整為「提示 (warn)」，避免強制報錯
     */
    "jsx-a11y/media-has-caption": "warn",
  },
  settings: {
    /**
     * 支援 @ 路徑 alias
     * 讓 ESLint 知道 @ 代表 ./app 目錄，避免報錯
     */
    'import/resolver': {
      alias: {
        map: [['@', './']],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
}
