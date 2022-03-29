


exports.getSignalList = async (page, pageSize) => {
  try{
    let start = 0;

    if(page <= 0) {
      page =1;
    }
    else {
      start = (page-1) * pageSize ;
    }

    const cnt = await user.Cnt(data);
    if (page > Math.round(cnt[0].total / pageSize))
    {
      return null ;
    }

    const artist_list = await user.pageAll(start, pageSize);
    return artist_list;
  }
  catch(err)
  {
    console.log('내 근처 Signal List 목록 가져오기 실패', err);
    throw err ;
  }
}

exports.signalList = async (req, res) => {
  const pageInfo = req.query;
  const page = parseInt(pageInfo.page);
  const pageSize = parseInt(pageSize); // pageInfo 안에 pageSize랑 page 수는 모지..?

  try {
    if (!pageInfo || !currentId || !pageSize) {
      console.log("Empty value");
    }

    const 
  }
}
