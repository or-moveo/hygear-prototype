import ScaledFrame from '../components/ScaledFrame'
import StudioHeader from '../components/StudioHeader'
const imgWrk121 = "/assets/workout-img-goal-achieved.png";
const imgIcon = "/assets/icon-goal-achieved.svg";
const imgTarget = "/assets/target-goal-achieved.svg";
const imgBarbell = "/assets/barbell-goal-achieved.svg";
const imgArrowsClockwise = "/assets/arrows-goal-achieved.svg";
const imgPerson = "/assets/person-goal-achieved.svg";
const imgMedal = "/assets/medal-goal-achieved.svg";
const imgVector = "/assets/vector-goal-achieved.svg";
const imgGroup = "/assets/group0-goal-achieved.svg";
const imgGroup1 = "/assets/group1-goal-achieved.svg";
const imgGroup2 = "/assets/group2-goal-achieved.svg";
const imgGroup3 = "/assets/group3-goal-achieved.svg";
const imgGroup4 = "/assets/group4-goal-achieved.svg";
const imgGroup5 = "/assets/group5-goal-achieved.svg";
const imgGroup6 = "/assets/group6-goal-achieved.svg";
const imgGroup7 = "/assets/group7-goal-achieved.svg";
const imgGroup8 = "/assets/group8-goal-achieved.svg";

export default function TrainingCompleted() {
  return (
    <ScaledFrame>
    <div className="bg-white relative size-full" data-name="Studio Dashboard — Training completed / goal achieved v1" data-node-id="376:8723">
      {/* Header */}
      <StudioHeader />
      <div className="absolute bg-[#def2e8] content-stretch flex items-end justify-between left-[51px] pt-[36px] px-[66px] rounded-[16px] top-[142px] w-[1819px]" data-name="Container" data-node-id="376:8728">
        <div className="content-stretch flex gap-[12px] items-end relative shrink-0" data-node-id="376:8729">
          <div className="relative shrink-0 size-[320px]" data-name="WRK-12 1" data-node-id="376:8730">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgWrk121} />
          </div>
          <div className="content-stretch flex flex-col gap-[12px] h-[316px] items-start justify-center not-italic pb-[36px] relative shrink-0" data-node-id="376:8731">
            <p className="font-poppins font-bold leading-[66px] min-w-full relative shrink-0 text-[#317c5c] text-[56px] w-[min-content]" data-node-id="376:8732">
              GOAL ACHIEVED!
            </p>
            <div className="font-poppins font-normal leading-[0] relative shrink-0 text-[32px] text-black whitespace-nowrap" data-node-id="376:8733">
              <p className="leading-[46px] mb-0">Perfect! Team completed 100%</p>
              <p className="leading-[46px]">of training goals</p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[48px] items-center pb-[36px] relative shrink-0" data-node-id="376:8734">
          <div className="relative shrink-0 size-[280px]" data-name="Container" data-node-id="376:8735">
            <div className="absolute flex items-center justify-center left-0 size-[280px] top-0">
              <div className="-rotate-90 flex-none">
                <div className="relative size-[280px]" data-name="Icon" data-node-id="376:8736">
                  <img alt="" className="absolute block max-w-none size-full" src={imgIcon} />
                </div>
              </div>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[80px] top-1/2" data-name="Target" data-node-id="376:8744">
              <img alt="" className="absolute block max-w-none size-full" src={imgTarget} />
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[400px]" data-name="Container" data-node-id="376:8749">
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container" data-node-id="376:8750">
              <div className="relative shrink-0" data-name="Container" data-node-id="376:8751">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
                  <div className="relative shrink-0 size-[46px]" data-name="Barbell" data-node-id="376:8752">
                    <img alt="" className="absolute block max-w-none size-full" src={imgBarbell} />
                  </div>
                  <div className="bg-[#4c735e] rounded-[23488080px] shrink-0 size-[11.2px]" data-name="Container" data-node-id="376:8762" />
                  <p className="font-poppins font-medium leading-[46px] not-italic relative shrink-0 text-[36px] text-black whitespace-nowrap" data-node-id="376:8763">
                    Reps
                  </p>
                </div>
              </div>
              <p className="font-poppins font-semibold leading-[46px] not-italic relative shrink-0 text-[36px] text-black whitespace-nowrap" data-node-id="376:8764">
                1530/1800
              </p>
            </div>
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container" data-node-id="376:8765">
              <div className="relative shrink-0" data-name="Container" data-node-id="376:8766">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
                  <div className="relative shrink-0 size-[46px]" data-name="ArrowsClockwise" data-node-id="376:8767">
                    <img alt="" className="absolute block max-w-none size-full" src={imgArrowsClockwise} />
                  </div>
                  <div className="bg-[#659a7e] rounded-[23488080px] shrink-0 size-[11.2px]" data-name="Container" data-node-id="376:8774" />
                  <p className="font-poppins font-medium leading-[46px] not-italic relative shrink-0 text-[36px] text-black whitespace-nowrap" data-node-id="376:8775">
                    KG
                  </p>
                </div>
              </div>
              <p className="font-poppins font-semibold leading-[46px] not-italic relative shrink-0 text-[36px] text-black whitespace-nowrap" data-node-id="376:8776">
                140/180
              </p>
            </div>
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container" data-node-id="376:8777">
              <div className="relative shrink-0" data-name="Container" data-node-id="376:8778">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
                  <div className="relative shrink-0 size-[46px]" data-name="Person" data-node-id="376:8779">
                    <img alt="" className="absolute block max-w-none size-full" src={imgPerson} />
                  </div>
                  <div className="bg-[#8db49f] rounded-[23488080px] shrink-0 size-[11.2px]" data-name="Container" data-node-id="376:8784" />
                  <p className="font-poppins font-medium leading-[46px] not-italic relative shrink-0 text-[36px] text-black whitespace-nowrap" data-node-id="376:8785">
                    BW%
                  </p>
                </div>
              </div>
              <p className="font-poppins font-semibold leading-[46px] not-italic relative shrink-0 text-[36px] text-black whitespace-nowrap" data-node-id="376:8786">
                1530/1800
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-[#def2e8] content-stretch flex flex-col gap-[30px] h-[486px] items-start left-1/2 p-[50px] rounded-[30px] top-[544px] w-[1820px]" data-name="Container" data-node-id="376:8787">
        <p className="font-poppins font-semibold leading-[46px] not-italic relative shrink-0 text-[36px] text-black whitespace-nowrap" data-node-id="376:8788">
          Top Contributors
        </p>
        <div className="content-stretch flex gap-[30px] h-[310px] items-start pr-[0.016px] relative shrink-0 w-full" data-name="Container" data-node-id="376:8789">
          <div className="bg-[#1d2e27] h-[310px] relative rounded-[20px] shrink-0 w-[553px]" data-name="Container" data-node-id="376:8790">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-center justify-center p-[30px] relative size-full">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-[449px]" data-node-id="376:8791">
                <div className="content-stretch flex flex-col gap-[4px] items-start justify-center not-italic relative shrink-0 text-white whitespace-nowrap" data-node-id="376:8792">
                  <p className="font-poppins font-bold leading-[58px] relative shrink-0 text-[48px]" data-node-id="376:8793">
                    #1
                  </p>
                  <p className="font-poppins font-semibold leading-[36px] relative shrink-0 text-[28px]" data-node-id="376:8794">
                    Ben
                  </p>
                </div>
                <div className="overflow-clip relative shrink-0 size-[98px]" data-name="Medal" data-node-id="376:8795">
                  <img alt="" className="absolute block max-w-none size-full" src={imgMedal} />
                  <div className="absolute contents inset-[4.08%_21.45%_4.08%_22.45%]" data-name="Group" data-node-id="376:8797">
                    <div className="absolute inset-[93.46%_24.82%_4.08%_25.82%]" data-name="Vector" data-node-id="376:8798">
                      <img alt="" className="absolute block max-w-none size-full" src={imgVector} />
                    </div>
                    <div className="absolute contents inset-[4.08%_21.45%_8.39%_22.45%]" data-name="Group" data-node-id="376:8799">
                      <div className="absolute inset-[4.08%_23.99%_65.78%_42.21%]" data-name="Group" data-node-id="376:8800">
                        <img alt="" className="absolute block max-w-none size-full" src={imgGroup} />
                      </div>
                      <div className="absolute inset-[30.49%_21.45%_8.39%_22.45%]" data-name="Group" data-node-id="376:8809">
                        <img alt="" className="absolute block max-w-none size-full" src={imgGroup1} />
                      </div>
                      <div className="absolute inset-[4.08%_41.22%_65.78%_24.98%]" data-name="Group" data-node-id="376:8816">
                        <img alt="" className="absolute block max-w-none size-full" src={imgGroup2} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[16px] items-start justify-center relative shrink-0 w-[450px]" data-name="Container" data-node-id="376:8820">
                <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[14px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]" data-name="Container" data-node-id="376:8821">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center not-italic px-[18px] py-[12px] relative text-black text-center w-full whitespace-nowrap">
                    <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]" data-node-id="376:8822">
                      REPS
                    </p>
                    <p className="font-poppins font-semibold leading-[46px] relative shrink-0 text-[36px]" data-node-id="376:8823">
                      268
                    </p>
                  </div>
                </div>
                <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[14px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]" data-name="Container" data-node-id="376:8824">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center not-italic px-[18px] py-[12px] relative text-black text-center w-full whitespace-nowrap">
                    <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]" data-node-id="376:8825">
                      KG
                    </p>
                    <p className="font-poppins font-semibold leading-[46px] relative shrink-0 text-[36px]" data-node-id="376:8826">
                      3963
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#317c5c] h-[310px] relative rounded-[20px] shrink-0 w-[553px]" data-name="Container" data-node-id="376:8827">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-center justify-center p-[30px] relative size-full">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-[449px]" data-node-id="376:8828">
                <div className="content-stretch flex flex-col gap-[4px] items-start justify-center not-italic relative shrink-0 text-white whitespace-nowrap" data-node-id="376:8829">
                  <p className="font-poppins font-bold leading-[58px] relative shrink-0 text-[48px]" data-node-id="376:8830">
                    #2
                  </p>
                  <p className="font-poppins font-semibold leading-[36px] relative shrink-0 text-[28px]" data-node-id="376:8831">
                    Mirel
                  </p>
                </div>
                <div className="overflow-clip relative shrink-0 size-[98px]" data-name="Medal" data-node-id="376:8832">
                  <img alt="" className="absolute block max-w-none size-full" src={imgMedal} />
                  <div className="absolute contents inset-[4.08%_21.45%_4.08%_22.45%]" data-name="Group" data-node-id="376:8834">
                    <div className="absolute inset-[93.46%_24.82%_4.08%_25.82%]" data-name="Vector" data-node-id="376:8835">
                      <img alt="" className="absolute block max-w-none size-full" src={imgVector} />
                    </div>
                    <div className="absolute contents inset-[4.08%_21.45%_8.39%_22.45%]" data-name="Group" data-node-id="376:8836">
                      <div className="absolute inset-[4.08%_23.99%_65.78%_42.21%]" data-name="Group" data-node-id="376:8837">
                        <img alt="" className="absolute block max-w-none size-full" src={imgGroup3} />
                      </div>
                      <div className="absolute inset-[30.49%_21.45%_8.39%_22.45%]" data-name="Group" data-node-id="376:8846">
                        <img alt="" className="absolute block max-w-none size-full" src={imgGroup4} />
                      </div>
                      <div className="absolute inset-[4.08%_41.22%_65.78%_24.98%]" data-name="Group" data-node-id="376:8853">
                        <img alt="" className="absolute block max-w-none size-full" src={imgGroup5} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[16px] items-start justify-center relative shrink-0 w-[450px]" data-name="Container" data-node-id="376:8857">
                <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[14px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]" data-name="Container" data-node-id="376:8858">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center not-italic px-[18px] py-[12px] relative text-black text-center w-full whitespace-nowrap">
                    <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]" data-node-id="376:8859">
                      REPS
                    </p>
                    <p className="font-poppins font-semibold leading-[46px] relative shrink-0 text-[36px]" data-node-id="376:8860">
                      268
                    </p>
                  </div>
                </div>
                <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[14px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]" data-name="Container" data-node-id="376:8861">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center not-italic px-[18px] py-[12px] relative text-black text-center w-full whitespace-nowrap">
                    <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]" data-node-id="376:8862">
                      KG
                    </p>
                    <p className="font-poppins font-semibold leading-[46px] relative shrink-0 text-[36px]" data-node-id="376:8863">
                      3963
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#659a7e] h-[310px] relative rounded-[20px] shrink-0 w-[553px]" data-name="Container" data-node-id="376:8864">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-center justify-center p-[30px] relative size-full">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-[449px]" data-node-id="376:8865">
                <div className="content-stretch flex flex-col gap-[4px] items-start justify-center not-italic relative shrink-0 text-white whitespace-nowrap" data-node-id="376:8866">
                  <p className="font-poppins font-bold leading-[58px] relative shrink-0 text-[48px]" data-node-id="376:8867">
                    #3
                  </p>
                  <p className="font-poppins font-semibold leading-[36px] relative shrink-0 text-[28px]" data-node-id="376:8868">
                    Gal
                  </p>
                </div>
                <div className="overflow-clip relative shrink-0 size-[98px]" data-name="Medal" data-node-id="376:8869">
                  <img alt="" className="absolute block max-w-none size-full" src={imgMedal} />
                  <div className="absolute contents inset-[4.08%_21.46%_4.08%_22.45%]" data-name="Group" data-node-id="376:8871">
                    <div className="absolute inset-[93.46%_24.83%_4.08%_25.81%]" data-name="Vector" data-node-id="376:8872">
                      <img alt="" className="absolute block max-w-none size-full" src={imgVector} />
                    </div>
                    <div className="absolute contents inset-[4.08%_21.46%_8.39%_22.45%]" data-name="Group" data-node-id="376:8873">
                      <div className="absolute inset-[4.08%_23.99%_65.78%_42.21%]" data-name="Group" data-node-id="376:8874">
                        <img alt="" className="absolute block max-w-none size-full" src={imgGroup6} />
                      </div>
                      <div className="absolute inset-[30.49%_21.46%_8.39%_22.45%]" data-name="Group" data-node-id="376:8883">
                        <img alt="" className="absolute block max-w-none size-full" src={imgGroup7} />
                      </div>
                      <div className="absolute inset-[4.08%_41.22%_65.78%_24.97%]" data-name="Group" data-node-id="376:8890">
                        <img alt="" className="absolute block max-w-none size-full" src={imgGroup8} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[16px] items-start justify-center relative shrink-0 w-[450px]" data-name="Container" data-node-id="376:8894">
                <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[14px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]" data-name="Container" data-node-id="376:8895">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center not-italic px-[18px] py-[12px] relative text-black text-center w-full whitespace-nowrap">
                    <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]" data-node-id="376:8896">
                      REPS
                    </p>
                    <p className="font-poppins font-semibold leading-[46px] relative shrink-0 text-[36px]" data-node-id="376:8897">
                      268
                    </p>
                  </div>
                </div>
                <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[14px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]" data-name="Container" data-node-id="376:8898">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center not-italic px-[18px] py-[12px] relative text-black text-center w-full whitespace-nowrap">
                    <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]" data-node-id="376:8899">
                      KG
                    </p>
                    <p className="font-poppins font-semibold leading-[46px] relative shrink-0 text-[36px]" data-node-id="376:8900">
                      3963
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </ScaledFrame>
  );
}
