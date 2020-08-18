class FriendsList {
  friends = [];

  addFriend(name) {
    this.friends.push(name);
    this.announceFriendship(name);
  }

  announceFriendship(name) {
    global.console.log(`${name} is now a friend!`);
  }
}

// test
describe('FriendsList', () => {
  it('init friends list', () => {
    const friendsList = new FriendsList();
    expect(friendsList.friends.length).toEqual(0);
  });

  it('add friend list', () => {
    const friendsList = new FriendsList();
    friendsList.addFriend('Long');
    expect(friendsList.friends.length).toEqual(1);
  });

  it('announces friendship', () => {
    const friendsList = new FriendsList();
    friendsList.addFriend('Long');
  });
});
