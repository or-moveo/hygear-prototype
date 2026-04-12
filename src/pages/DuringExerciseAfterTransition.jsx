import ScaledFrame from '../components/ScaledFrame'
import TrainingStructure from '../components/TrainingStructure'
import StudioHeader from '../components/StudioHeader'
const imgIcon = "/assets/donut-icon-after.svg";
const imgBarbell = "/assets/barbell-after.svg";
const imgArrowsClockwise = "/assets/arrows-after.svg";
const imgPerson = "/assets/person-after.svg";
const imgIcon1 = "/assets/timer-after.svg";
const imgBluetooth = "/icons/bluetooth-active.svg";
const imgVector2 = "/icons/divider.svg";
const imgHeart = "/icons/heart.svg";
const imgBluetooth1 = "/icons/bluetooth-inactive.svg";

export default function StudioDashboardDuringTheExerciseAfterTransition() {
  return (
    <ScaledFrame>
    <div className="bg-white relative size-full" data-name="Studio Dashboard — During the exercise (after transition)" data-node-id="376:6823">
      {/* Header */}
      <StudioHeader />
      <div className="absolute left-[1500px] top-[142px]">
        <TrainingStructure />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[50px] items-start left-[51px] top-[142px] w-[1400px]" data-node-id="376:6896">
        <div className="content-stretch flex gap-[50px] items-center relative shrink-0 w-full" data-node-id="376:6897">
          <div className="bg-[#f8f7f7] content-stretch flex items-center justify-center p-[36px] relative rounded-[16px] shrink-0 w-[900px]" data-name="Container" data-node-id="376:6898">
            <div className="content-stretch flex gap-[88px] items-center relative shrink-0" data-node-id="376:6899">
              <div className="relative shrink-0 size-[280px]" data-name="Container" data-node-id="376:6900">
                <div className="absolute flex items-center justify-center left-0 size-[280px] top-0">
                  <div className="-rotate-90 flex-none">
                    <div className="relative size-[280px]" data-name="Icon" data-node-id="376:6901">
                      <img alt="" className="absolute block max-w-none size-full" src={imgIcon} />
                    </div>
                  </div>
                </div>
                <div className="absolute content-stretch flex flex-col items-center left-[98px] not-italic pb-[8px] text-black top-[107.1px] whitespace-nowrap" data-node-id="376:6908">
                  <p className="font-poppins font-semibold leading-[46px] relative shrink-0 text-[36px]" data-node-id="376:6909">
                    73%
                  </p>
                  <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]" data-node-id="376:6910">
                    Complete
                  </p>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[400px]" data-name="Container" data-node-id="376:6911">
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container" data-node-id="376:6912">
                  <div className="relative shrink-0" data-name="Container" data-node-id="376:6913">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
                      <div className="relative shrink-0 size-[46px]" data-name="Barbell" data-node-id="376:6914">
                        <img alt="" className="absolute block max-w-none size-full" src={imgBarbell} />
                      </div>
                      <div className="bg-[#4c735e] rounded-[23488080px] shrink-0 size-[11.2px]" data-name="Container" data-node-id="376:6924" />
                      <p className="font-poppins font-medium leading-[46px] not-italic relative shrink-0 text-[36px] text-black whitespace-nowrap" data-node-id="376:6925">
                        Reps
                      </p>
                    </div>
                  </div>
                  <p className="font-poppins font-semibold leading-[46px] not-italic relative shrink-0 text-[36px] text-black whitespace-nowrap" data-node-id="376:6926">
                    1530/1800
                  </p>
                </div>
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container" data-node-id="376:6927">
                  <div className="relative shrink-0" data-name="Container" data-node-id="376:6928">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
                      <div className="relative shrink-0 size-[46px]" data-name="ArrowsClockwise" data-node-id="376:6929">
                        <img alt="" className="absolute block max-w-none size-full" src={imgArrowsClockwise} />
                      </div>
                      <div className="bg-[#659a7e] rounded-[23488080px] shrink-0 size-[11.2px]" data-name="Container" data-node-id="376:6936" />
                      <p className="font-poppins font-medium leading-[46px] not-italic relative shrink-0 text-[36px] text-black whitespace-nowrap" data-node-id="376:6937">
                        KG
                      </p>
                    </div>
                  </div>
                  <p className="font-poppins font-semibold leading-[46px] not-italic relative shrink-0 text-[36px] text-black whitespace-nowrap" data-node-id="376:6938">
                    140/180
                  </p>
                </div>
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container" data-node-id="376:6939">
                  <div className="relative shrink-0" data-name="Container" data-node-id="376:6940">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
                      <div className="relative shrink-0 size-[46px]" data-name="Person" data-node-id="376:6941">
                        <img alt="" className="absolute block max-w-none size-full" src={imgPerson} />
                      </div>
                      <div className="bg-[#8db49f] rounded-[23488080px] shrink-0 size-[11.2px]" data-name="Container" data-node-id="376:6946" />
                      <p className="font-poppins font-medium leading-[46px] not-italic relative shrink-0 text-[36px] text-black whitespace-nowrap" data-node-id="376:6947">
                        BW%
                      </p>
                    </div>
                  </div>
                  <p className="font-poppins font-semibold leading-[46px] not-italic relative shrink-0 text-[36px] text-black whitespace-nowrap" data-node-id="376:6948">
                    1530/1800
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#f8f7f7] content-stretch flex items-center justify-center p-[36px] relative rounded-[16px] shrink-0 w-[450px]" data-name="Container" data-node-id="376:6949">
            <div className="flex items-center justify-center relative shrink-0 size-[280px]">
              <div className="flex-none rotate-90">
                <div className="content-stretch flex items-center relative w-[280px]" data-node-id="376:6950">
                  <div className="flex items-center justify-center relative shrink-0 size-[280px]">
                    <div className="-rotate-90 flex-none">
                      <div className="content-stretch flex flex-col gap-[8px] items-start px-[78px] py-[92px] relative size-[280px]" data-node-id="376:6951">
                        <div className="absolute flex items-center justify-center left-0 size-[280px] top-0">
                          <div className="-rotate-90 flex-none">
                            <div className="relative size-[280px]" data-name="Icon" data-node-id="376:6952">
                              <img alt="" className="absolute block max-w-none size-full" src={imgIcon1} />
                            </div>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col gap-[2px] items-center justify-center not-italic relative shrink-0 text-black w-[124px]" data-node-id="376:6955">
                          <p className="font-poppins font-semibold leading-[66px] relative shrink-0 text-[56px] w-full" data-node-id="376:6956">
                            0:45
                          </p>
                          <p className="font-poppins font-normal leading-[28px] relative shrink-0 text-[18px] text-center w-full" data-node-id="376:6957">
                            WORK
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[1400px]" data-node-id="376:6958">
          <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-node-id="376:6959">
            <div className="content-stretch flex gap-[25px] items-center relative shrink-0 w-full" data-node-id="376:6960">
              <div className="bg-[#edf3ef] content-stretch flex flex-col gap-[24px] items-start p-[24px] relative rounded-[16px] shrink-0 w-[331px]" data-node-id="376:6961">
                <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-node-id="376:6962">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="376:6963">
                    <div className="relative shrink-0 size-[34px]" data-name="Bluetooth" data-node-id="376:6964">
                      <img alt="" className="absolute block max-w-none size-full" src={imgBluetooth} />
                    </div>
                    <p className="font-poppins font-bold leading-[34px] not-italic relative shrink-0 text-[24px] text-black whitespace-nowrap" data-node-id="376:6971">
                      Dan
                    </p>
                  </div>
                  <div className="h-[30px] relative shrink-0 w-0" data-node-id="376:6972">
                    <div className="absolute inset-[0_-1px]">
                      <img alt="" className="block max-w-none size-full" src={imgVector2} />
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="376:6973">
                    <div className="relative shrink-0 size-[34px]" data-name="Heart" data-node-id="376:6974">
                      <img alt="" className="absolute block max-w-none size-full" src={imgHeart} />
                    </div>
                    <div className="flex flex-col font-poppins font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#43a77c] text-[24px] whitespace-nowrap" data-node-id="376:6977">
                      <p className="leading-[34px]">141</p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[16px] h-[108px] items-start justify-center relative shrink-0 w-full" data-name="Container" data-node-id="376:6978">
                  <div className="bg-white flex-[1_0_0] h-[108px] min-h-px min-w-px relative rounded-[14px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]" data-name="Container" data-node-id="376:6979">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center not-italic p-[18px] relative size-full text-black text-center whitespace-nowrap">
                      <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]" data-node-id="376:6980">
                        REPS
                      </p>
                      <p className="font-poppins font-semibold leading-[46px] relative shrink-0 text-[36px]" data-node-id="376:6981">
                        159
                      </p>
                    </div>
                  </div>
                  <div className="bg-white flex-[1_0_0] h-[108px] min-h-px min-w-px relative rounded-[14px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]" data-name="Container" data-node-id="376:6982">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center not-italic p-[18px] relative size-full text-black text-center whitespace-nowrap">
                      <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]" data-node-id="376:6983">
                        KG
                      </p>
                      <p className="font-poppins font-semibold leading-[46px] relative shrink-0 text-[36px]" data-node-id="376:6984">
                        1897
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#edf3ef] content-stretch flex flex-col gap-[24px] items-start p-[24px] relative rounded-[16px] shrink-0 w-[331px]" data-node-id="376:6985">
                <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-node-id="376:6986">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="376:6987">
                    <div className="relative shrink-0 size-[34px]" data-name="Bluetooth" data-node-id="376:6988">
                      <img alt="" className="absolute block max-w-none size-full" src={imgBluetooth} />
                    </div>
                    <p className="font-poppins font-bold leading-[34px] not-italic relative shrink-0 text-[24px] text-black whitespace-nowrap" data-node-id="376:6995">
                      Ben
                    </p>
                  </div>
                  <div className="h-[30px] relative shrink-0 w-0" data-node-id="376:6996">
                    <div className="absolute inset-[0_-1px]">
                      <img alt="" className="block max-w-none size-full" src={imgVector2} />
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="376:6997">
                    <div className="relative shrink-0 size-[34px]" data-name="Heart" data-node-id="376:6998">
                      <img alt="" className="absolute block max-w-none size-full" src={imgHeart} />
                    </div>
                    <div className="flex flex-col font-poppins font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#43a77c] text-[24px] whitespace-nowrap" data-node-id="376:7001">
                      <p className="leading-[34px]">152</p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[16px] h-[108px] items-start justify-center relative shrink-0 w-full" data-name="Container" data-node-id="376:7002">
                  <div className="bg-white flex-[1_0_0] h-[108px] min-h-px min-w-px relative rounded-[14px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]" data-name="Container" data-node-id="376:7003">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center not-italic p-[18px] relative size-full text-black text-center whitespace-nowrap">
                      <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]" data-node-id="376:7004">
                        REPS
                      </p>
                      <p className="font-poppins font-semibold leading-[46px] relative shrink-0 text-[36px]" data-node-id="376:7005">
                        268
                      </p>
                    </div>
                  </div>
                  <div className="bg-white flex-[1_0_0] h-[108px] min-h-px min-w-px relative rounded-[14px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]" data-name="Container" data-node-id="376:7006">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center not-italic p-[18px] relative size-full text-black text-center whitespace-nowrap">
                      <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]" data-node-id="376:7007">
                        KG
                      </p>
                      <p className="font-poppins font-semibold leading-[46px] relative shrink-0 text-[36px]" data-node-id="376:7008">
                        3963
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#edf3ef] content-stretch flex flex-col gap-[24px] items-start p-[24px] relative rounded-[16px] shrink-0 w-[331px]" data-node-id="376:7009">
                <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-node-id="376:7010">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="376:7011">
                    <div className="relative shrink-0 size-[34px]" data-name="Bluetooth" data-node-id="376:7012">
                      <img alt="" className="absolute block max-w-none size-full" src={imgBluetooth} />
                    </div>
                    <p className="font-poppins font-bold leading-[34px] not-italic relative shrink-0 text-[24px] text-black whitespace-nowrap" data-node-id="376:7019">
                      Leo
                    </p>
                  </div>
                  <div className="h-[30px] relative shrink-0 w-0" data-node-id="376:7020">
                    <div className="absolute inset-[0_-1px]">
                      <img alt="" className="block max-w-none size-full" src={imgVector2} />
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="376:7021">
                    <div className="relative shrink-0 size-[34px]" data-name="Heart" data-node-id="376:7022">
                      <img alt="" className="absolute block max-w-none size-full" src={imgHeart} />
                    </div>
                    <div className="flex flex-col font-poppins font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#43a77c] text-[24px] whitespace-nowrap" data-node-id="376:7025">
                      <p className="leading-[34px]">130</p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[16px] h-[108px] items-start justify-center relative shrink-0 w-full" data-name="Container" data-node-id="376:7026">
                  <div className="bg-white flex-[1_0_0] h-[108px] min-h-px min-w-px relative rounded-[14px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]" data-name="Container" data-node-id="376:7027">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center not-italic p-[18px] relative size-full text-black text-center whitespace-nowrap">
                      <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]" data-node-id="376:7028">
                        REPS
                      </p>
                      <p className="font-poppins font-semibold leading-[46px] relative shrink-0 text-[36px]" data-node-id="376:7029">
                        230
                      </p>
                    </div>
                  </div>
                  <div className="bg-white flex-[1_0_0] h-[108px] min-h-px min-w-px relative rounded-[14px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]" data-name="Container" data-node-id="376:7030">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center not-italic p-[18px] relative size-full text-black text-center whitespace-nowrap">
                      <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]" data-node-id="376:7031">
                        KG
                      </p>
                      <p className="font-poppins font-semibold leading-[46px] relative shrink-0 text-[36px]" data-node-id="376:7032">
                        3017
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#edf3ef] content-stretch flex flex-col gap-[24px] items-start p-[24px] relative rounded-[16px] shrink-0 w-[331px]" data-node-id="376:7033">
                <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-node-id="376:7034">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="376:7035">
                    <div className="relative shrink-0 size-[34px]" data-name="Bluetooth" data-node-id="376:7036">
                      <img alt="" className="absolute block max-w-none size-full" src={imgBluetooth1} />
                    </div>
                    <p className="font-poppins font-bold leading-[34px] not-italic relative shrink-0 text-[24px] text-black whitespace-nowrap" data-node-id="376:7043">
                      Emma
                    </p>
                  </div>
                  <div className="h-[30px] relative shrink-0 w-0" data-node-id="376:7044">
                    <div className="absolute inset-[0_-1px]">
                      <img alt="" className="block max-w-none size-full" src={imgVector2} />
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="376:7045">
                    <div className="relative shrink-0 size-[34px]" data-name="Heart" data-node-id="376:7046">
                      <img alt="" className="absolute block max-w-none size-full" src={imgHeart} />
                    </div>
                    <div className="flex flex-col font-poppins font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#43a77c] text-[24px] whitespace-nowrap" data-node-id="376:7049">
                      <p className="leading-[34px]">129</p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[16px] h-[108px] items-start justify-center relative shrink-0 w-full" data-name="Container" data-node-id="376:7050">
                  <div className="bg-white flex-[1_0_0] h-[108px] min-h-px min-w-px relative rounded-[14px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]" data-name="Container" data-node-id="376:7051">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center not-italic p-[18px] relative size-full text-black text-center whitespace-nowrap">
                      <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]" data-node-id="376:7052">
                        REPS
                      </p>
                      <p className="font-poppins font-semibold leading-[46px] relative shrink-0 text-[36px]" data-node-id="376:7053">
                        198
                      </p>
                    </div>
                  </div>
                  <div className="bg-white flex-[1_0_0] h-[108px] min-h-px min-w-px relative rounded-[14px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]" data-name="Container" data-node-id="376:7054">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center not-italic p-[18px] relative size-full text-black text-center whitespace-nowrap">
                      <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]" data-node-id="376:7055">
                        KG
                      </p>
                      <p className="font-poppins font-semibold leading-[46px] relative shrink-0 text-[36px]" data-node-id="376:7056">
                        2946
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[25px] items-center relative shrink-0 w-full" data-node-id="376:7057">
              <div className="bg-[#edf3ef] content-stretch flex flex-col gap-[24px] items-start p-[24px] relative rounded-[16px] shrink-0 w-[331px]" data-node-id="376:7058">
                <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-node-id="376:7059">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="376:7060">
                    <div className="relative shrink-0 size-[34px]" data-name="Bluetooth" data-node-id="376:7061">
                      <img alt="" className="absolute block max-w-none size-full" src={imgBluetooth} />
                    </div>
                    <p className="font-poppins font-bold leading-[34px] not-italic relative shrink-0 text-[24px] text-black whitespace-nowrap" data-node-id="376:7068">
                      Mirel
                    </p>
                  </div>
                  <div className="h-[30px] relative shrink-0 w-0" data-node-id="376:7069">
                    <div className="absolute inset-[0_-1px]">
                      <img alt="" className="block max-w-none size-full" src={imgVector2} />
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="376:7070">
                    <div className="relative shrink-0 size-[34px]" data-name="Heart" data-node-id="376:7071">
                      <img alt="" className="absolute block max-w-none size-full" src={imgHeart} />
                    </div>
                    <div className="flex flex-col font-poppins font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#43a77c] text-[24px] whitespace-nowrap" data-node-id="376:7074">
                      <p className="leading-[34px]">155</p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[16px] h-[108px] items-start justify-center relative shrink-0 w-full" data-name="Container" data-node-id="376:7075">
                  <div className="bg-white flex-[1_0_0] h-[108px] min-h-px min-w-px relative rounded-[14px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]" data-name="Container" data-node-id="376:7076">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center not-italic p-[18px] relative size-full text-black text-center whitespace-nowrap">
                      <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]" data-node-id="376:7077">
                        REPS
                      </p>
                      <p className="font-poppins font-semibold leading-[46px] relative shrink-0 text-[36px]" data-node-id="376:7078">
                        251
                      </p>
                    </div>
                  </div>
                  <div className="bg-white flex-[1_0_0] h-[108px] min-h-px min-w-px relative rounded-[14px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]" data-name="Container" data-node-id="376:7079">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center not-italic p-[18px] relative size-full text-black text-center whitespace-nowrap">
                      <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]" data-node-id="376:7080">
                        KG
                      </p>
                      <p className="font-poppins font-semibold leading-[46px] relative shrink-0 text-[36px]" data-node-id="376:7081">
                        3643
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#edf3ef] content-stretch flex flex-col gap-[24px] items-start p-[24px] relative rounded-[16px] shrink-0 w-[331px]" data-node-id="376:7082">
                <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-node-id="376:7083">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="376:7084">
                    <div className="relative shrink-0 size-[34px]" data-name="Bluetooth" data-node-id="376:7085">
                      <img alt="" className="absolute block max-w-none size-full" src={imgBluetooth} />
                    </div>
                    <p className="font-poppins font-bold leading-[34px] not-italic relative shrink-0 text-[24px] text-black whitespace-nowrap" data-node-id="376:7092">
                      Shir
                    </p>
                  </div>
                  <div className="h-[30px] relative shrink-0 w-0" data-node-id="376:7093">
                    <div className="absolute inset-[0_-1px]">
                      <img alt="" className="block max-w-none size-full" src={imgVector2} />
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="376:7094">
                    <div className="relative shrink-0 size-[34px]" data-name="Heart" data-node-id="376:7095">
                      <img alt="" className="absolute block max-w-none size-full" src={imgHeart} />
                    </div>
                    <div className="flex flex-col font-poppins font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#43a77c] text-[24px] whitespace-nowrap" data-node-id="376:7098">
                      <p className="leading-[34px]">149</p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[16px] h-[108px] items-start justify-center relative shrink-0 w-full" data-name="Container" data-node-id="376:7099">
                  <div className="bg-white flex-[1_0_0] h-[108px] min-h-px min-w-px relative rounded-[14px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]" data-name="Container" data-node-id="376:7100">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center not-italic p-[18px] relative size-full text-black text-center whitespace-nowrap">
                      <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]" data-node-id="376:7101">
                        REPS
                      </p>
                      <p className="font-poppins font-semibold leading-[46px] relative shrink-0 text-[36px]" data-node-id="376:7102">
                        220
                      </p>
                    </div>
                  </div>
                  <div className="bg-white flex-[1_0_0] h-[108px] min-h-px min-w-px relative rounded-[14px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]" data-name="Container" data-node-id="376:7103">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center not-italic p-[18px] relative size-full text-black text-center whitespace-nowrap">
                      <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]" data-node-id="376:7104">
                        KG
                      </p>
                      <p className="font-poppins font-semibold leading-[46px] relative shrink-0 text-[36px]" data-node-id="376:7105">
                        3432
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#edf3ef] content-stretch flex flex-col gap-[24px] items-start p-[24px] relative rounded-[16px] shrink-0 w-[331px]" data-node-id="376:7106">
                <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-node-id="376:7107">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="376:7108">
                    <div className="relative shrink-0 size-[34px]" data-name="Bluetooth" data-node-id="376:7109">
                      <img alt="" className="absolute block max-w-none size-full" src={imgBluetooth} />
                    </div>
                    <p className="font-poppins font-bold leading-[34px] not-italic relative shrink-0 text-[24px] text-black whitespace-nowrap" data-node-id="376:7116">
                      Gal
                    </p>
                  </div>
                  <div className="h-[30px] relative shrink-0 w-0" data-node-id="376:7117">
                    <div className="absolute inset-[0_-1px]">
                      <img alt="" className="block max-w-none size-full" src={imgVector2} />
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="376:7118">
                    <div className="relative shrink-0 size-[34px]" data-name="Heart" data-node-id="376:7119">
                      <img alt="" className="absolute block max-w-none size-full" src={imgHeart} />
                    </div>
                    <div className="flex flex-col font-poppins font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#43a77c] text-[24px] whitespace-nowrap" data-node-id="376:7122">
                      <p className="leading-[34px]">127</p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[16px] h-[108px] items-start justify-center relative shrink-0 w-full" data-name="Container" data-node-id="376:7123">
                  <div className="bg-white flex-[1_0_0] h-[108px] min-h-px min-w-px relative rounded-[14px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]" data-name="Container" data-node-id="376:7124">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center not-italic p-[18px] relative size-full text-black text-center whitespace-nowrap">
                      <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]" data-node-id="376:7125">
                        REPS
                      </p>
                      <p className="font-poppins font-semibold leading-[46px] relative shrink-0 text-[36px]" data-node-id="376:7126">
                        202
                      </p>
                    </div>
                  </div>
                  <div className="bg-white flex-[1_0_0] h-[108px] min-h-px min-w-px relative rounded-[14px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]" data-name="Container" data-node-id="376:7127">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center not-italic p-[18px] relative size-full text-black text-center whitespace-nowrap">
                      <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]" data-node-id="376:7128">
                        KG
                      </p>
                      <p className="font-poppins font-semibold leading-[46px] relative shrink-0 text-[36px]" data-node-id="376:7129">
                        3161
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#edf3ef] content-stretch flex flex-col gap-[24px] items-start p-[24px] relative rounded-[16px] shrink-0 w-[331px]" data-node-id="376:7130">
                <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-node-id="376:7131">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="376:7132">
                    <div className="relative shrink-0 size-[34px]" data-name="Bluetooth" data-node-id="376:7133">
                      <img alt="" className="absolute block max-w-none size-full" src={imgBluetooth1} />
                    </div>
                    <p className="font-poppins font-bold leading-[34px] not-italic relative shrink-0 text-[24px] text-black whitespace-nowrap" data-node-id="376:7140">
                      Chris
                    </p>
                  </div>
                  <div className="h-[30px] relative shrink-0 w-0" data-node-id="376:7141">
                    <div className="absolute inset-[0_-1px]">
                      <img alt="" className="block max-w-none size-full" src={imgVector2} />
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="376:7142">
                    <div className="relative shrink-0 size-[34px]" data-name="Heart" data-node-id="376:7143">
                      <img alt="" className="absolute block max-w-none size-full" src={imgHeart} />
                    </div>
                    <div className="flex flex-col font-poppins font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#43a77c] text-[24px] whitespace-nowrap" data-node-id="376:7146">
                      <p className="leading-[34px]">138</p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[16px] h-[108px] items-start justify-center relative shrink-0 w-full" data-name="Container" data-node-id="376:7147">
                  <div className="bg-white flex-[1_0_0] h-[108px] min-h-px min-w-px relative rounded-[14px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]" data-name="Container" data-node-id="376:7148">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center not-italic p-[18px] relative size-full text-black text-center whitespace-nowrap">
                      <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]" data-node-id="376:7149">
                        REPS
                      </p>
                      <p className="font-poppins font-semibold leading-[46px] relative shrink-0 text-[36px]" data-node-id="376:7150">
                        191
                      </p>
                    </div>
                  </div>
                  <div className="bg-white flex-[1_0_0] h-[108px] min-h-px min-w-px relative rounded-[14px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]" data-name="Container" data-node-id="376:7151">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center not-italic p-[18px] relative size-full text-black text-center whitespace-nowrap">
                      <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]" data-node-id="376:7152">
                        KG
                      </p>
                      <p className="font-poppins font-semibold leading-[46px] relative shrink-0 text-[36px]" data-node-id="376:7153">
                        2863
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="376:7154">
            <div className="h-[8px] relative shrink-0 w-[1400px]" data-node-id="376:7155">
              <div className="absolute bg-[#d9e7e0] h-[8px] right-0 rounded-[20px] top-0 w-[1400px]" data-node-id="376:7156" />
              <div className="absolute bg-[#43a77c] h-[8px] left-0 rounded-[20px] top-0 w-[470px]" data-node-id="376:7157" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </ScaledFrame>
  );
}
