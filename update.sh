cd css

STUDIO_LOC="/Volumes/航成大好き/"
STUDIO=false
pwd=$(pwd)


# check if using mac studio
if [ -d $STUDIO_LOC ]; then
  echo "using studio"
  STUDIO=true
  cd $STUDIO_LOC
fi

echo $STUDIO

# update or clone bootstrap git
if [ ! -d "bootstrap" ]; then
  git clone git@github.com:twbs/bootstrap.git
  cd bootstrap
else
  cd bootstrap
  git pull
fi

# copy files or whatever
if $STUDIO; then
  needDir="${pwd}/bootstrap"
  if [ ! -d $needDir ]; then
    mkdir $needDir
  fi
  needDir="${needDir}/scss"
  if [ ! -d $needDir ]; then
    mkdir $needDir
  fi

  echo $needDir
  cp -r ./scss "${pwd}/bootstrap"
fi


cd $pwd
ls
sass plain.scss plain.css