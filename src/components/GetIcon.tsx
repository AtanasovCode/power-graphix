//Importing all the icons for the exercises
import bench from '../assets/icons/bench.png';
import curl from '../assets/icons/curl.png';
import ohp from '../assets/icons/ohp.png';
import lat from '../assets/icons/lat.png';
import squat from '../assets/icons/squat.png';
import deadlift from '../assets/icons/deadlift.png';
import frontRaise from '../assets/icons/front-raise.png';
import hammer from '../assets/icons/hammer.png';
import chinUp from '../assets/icons/chin-up.png';
import calfRaise from '../assets/icons/calf-raise.png';
import pullUp from '../assets/icons/pull-up.png';
import pushUp from '../assets/icons/push-up.png';
import latRaise from '../assets/icons/lat-raise.png';
import inclineBench from '../assets/icons/incline-bp.png';
import dips from '../assets/icons/dips.png';
import cableCrossover from '../assets/icons/cable-crossover.png';
import bentRow from '../assets/icons/row.png';
import lowSeatedRow from '../assets/icons/cable-seated-row.png';
import lunges from '../assets/icons/lunges.png';
import legPress from '../assets/icons/leg-press.png';
import ropePushdown from '../assets/icons/rope-extension.png';
import kickbacks from '../assets/icons/tri-kickback.png';

  //each exercise gets an icon
  export const getExerciseIcon = (name: string) => {
    switch (name) {
      case "Bench Press": return bench;
      case "Incline Bench Press": return inclineBench;
      case "Cable Crossover": return cableCrossover;
      case "Push-up": return pushUp;
      case "Bent-over Row": return bentRow;
      case "Low Seated Row": return lowSeatedRow;
      case "Pull-up": return pullUp;
      case "Deadlift": return deadlift;
      case "Lat Pulldown": return lat;
      case "Squat": return squat;
      case "Lunges": return lunges;
      case "Leg Press": return legPress;
      case "Calf Raise": return calfRaise;
      case "Rope Pushdown": return ropePushdown;
      case "Tricep Kickback": return kickbacks;
      case "Bicep Curl": return curl;
      case "Hammer Curl": return hammer;
      case "Chin-up": return chinUp;
      case "Tricep Extension": break;
      case "Skull Crusher": break;
      case "Dips": return dips;
      case "Shoulder Press": return ohp;
      case "Lateral Raise": return latRaise;
      case "Front Raise": return frontRaise;
      case "Rear Delt Fly": break;
    }
  }