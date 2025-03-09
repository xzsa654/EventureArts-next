'use client'

export default function UploadProcess(props) {
  return (
    <>
      <div className="w-[270px] py-8">
        <div className="stepimg w-[250px] h-[250px]">
          <img
            className="w-[90%]"
            src="/Blair/event/step1.svg"
            alt="上架流程示意圖"
          />
        </div>
        <div className="steptext text-center">
          <p>STEP 1</p>
          <br />
          <p className="stepTitle text-2xl font-bold">設計課程與展覽</p>
          <br />
          <p>
            規劃課程或展覽的主題、時間、地點及內容，確保活動能夠吸引目標客群。
          </p>
        </div>
      </div>

      <div className="w-[270px] py-8">
        <div className="stepimg w-[250px] h-[250px]">
          <img
            className="w-[90%]"
            src="/Blair/event/step2.svg"
            alt="上架流程示意圖"
          />
        </div>
        <div className="steptext text-center">
          <p>STEP 2</p>
          <br />
          <p className="stepTitle text-2xl font-bold">加入平台</p>
          <br />
          <p>
            註冊平台並撰寫簡潔的品牌介紹，展示品牌特色及核心價值，提升信任感。
          </p>
        </div>
      </div>

      <div className="w-[270px] py-8">
        <div className="stepimg w-[250px] h-[250px]">
          <img
            className="w-[90%]"
            src="/Blair/event/step3.svg"
            alt="上架流程示意圖"
          />
        </div>
        <div className="steptext text-center">
          <p>STEP 3</p>
          <br />
          <p className="stepTitle text-2xl font-bold">上架課程與展覽</p>
          <br />
          <p>將課程或展覽的詳細資訊上傳至平台，並完成上架流程。</p>
        </div>
      </div>

      <div className="w-[270px] py-8">
        <div className="stepimg w-[250px] h-[250px]">
          <img
            className="w-[90%]"
            src="/Blair/event/step4.svg"
            alt="上架流程示意圖"
          />
        </div>
        <div className="steptext text-center">
          <p>STEP 4</p>
          <br />
          <p className="stepTitle text-2xl font-bold">用戶參與課程或展覽</p>
          <br />
          <p>用戶完成報名或購票後，依照課程或展覽時間與地點前往實體參與。</p>
        </div>
      </div>
    </>
  )
}
