# MovieBrowser

 <p align="center"> <img src="https://github.com/papsti7/MovieBrowserApp/blob/develop/Screenshots/android/0.jpg" align="center" height="760" width="448" ></p>
## Motivation

MovieBrowser is a simple read-only app, made for Android and iOS, to get an fast overview of currently popular movies and tvshows. Therefore I made use of an API provided by TheMovieDB. Feel free to check it out, the best public movie db API out there.

## Implementation

For the implementation I used a cross-platform framework called React Native. The next section covers my entire development setup:

### Environment

As an editor I used **Visual Studio Code**.
The command `react-native info` gives me this information:

```
  React Native Environment Info:
    System:
      OS: macOS 10.14
      CPU: x64 Intel(R) Core(TM) i7-4980HQ CPU @ 2.80GHz
      Memory: 1.67 GB / 16.00 GB
      Shell: 3.2.57 - /bin/bash
    Binaries:
      Node: 9.8.0 - ~/.nvm/versions/node/v10.9.0/bin/node
      Yarn: 1.3.2 - ~/.yarn/bin/yarn
      npm: 6.2.0 - ~/.nvm/versions/node/v10.9.0/bin/npm
      Watchman: 4.7.0 - /usr/local/bin/watchman
    SDKs:
      iOS SDK:
        Platforms: iOS 12.0, macOS 10.14, tvOS 12.0, watchOS 5.0
      Android SDK:
        Build Tools: 23.0.1, 23.0.2, 25.0.0, 25.0.1, 25.0.2, 25.0.3, 26.0.1, 26.0.2, 26.0.3, 27.0.2, 27.0.3, 28.0.0
        API Levels: 16, 21, 23, 25, 26, 27, 28
    IDEs:
      Android Studio: 3.1 AI-173.4819257
      Xcode: 10.0/10A255 - /usr/bin/xcodebuild
    npmPackages:
      react: 16.5.0 => 16.5.0
      react-native: 0.57.0 => 0.57.0
```

As you can see I used React Native version `0.57.0`.

For desiging UI elements I usually use `Affinity Designer`.

### Node packages

If you want to have a closer look at the specific versions of the packages, please have a look at the package.json (and maybe package-lock.json).

This is the list of frameworks that make it happen to realize this project in such short amount of time:

- **Axios**: Easy network request handling
- **Lodash**: Utility framework
- **Shoutem UI**: UI Framework
- **React Navigation**: Javascript based navigation framework
- **Eslint & eslint airbnb config**: Lint javascript code by using the airbnb config as a base.

### Features

The app uses API calls to `Discover Movie`, `Discover TVShows` and `Discover Genre`, where genre is a list of all available movie genres of TMDb. To really get what you desire I implemented a search as well, which responds movie and tvshow result for a certain keyword. If you are interested in an item, you can just tap on the cover and get transitioned to a detail screen which gives you more information about the chosen title.

### Evaluation and Findings

As I'm coming from "native" iOS development, I'm always curious about a comparison between a cross-platform solution and a native one. This comparison usually includes time-to-implement, performance, look-and-feel and fun. Before you read my 2 cents of this you should barely know what my background and level of experience is: I've done various professional iOS project in the last 2 years. I have a basic knowledge in Android development gained by university and spare time projects. My currently field of expertise is for sure react-native. I'm heavily using it for over a year at work and whenever I'm free. I like javascript a lot and the react component pattern, even if it is against the SOC pattern I learned at university.
That should be enough for now, let's talk about the project:

#### Time-To-Implement

All togheter it took me a full-time week to setup up the project, search for an api, think of a simple design, implement it, write the readme and create the store screenshots. In my opinion that's fair as far as I get an Android and iOS app. If you're really experinced in Android and iOS development, you might be faster with building the UI and doing the setup, but doing network requests feels so easy with javascript and I'm sure this would take me longer if I would do it natively in Obj-C or Swift. In my opinion for such small projects and with these requirements, react-native makes sense the most.

#### Performance

React-native is using a bridge to call native elements on every platform. That means a JS-Thread is running while the app is running and interprets the javascript code. That takes some time and surely reduces the speed of the app. It's a bit a trap that you can use react-native for "easily" building native apps that perform like native apps. It is highly recommened to think what you are doing in every component, for example are you holding references or recreate the same object every render cycle? Do you use `React.Components` or `React.PureComponents`? What's the difference? Why and when do I implement `shouldComponentUpdate`? Those thoughs make the difference between a beginner and an experienced one (Not only, but I think you get what I'm trying to say). If we now have look at the MovieBrowser, I did everything I know to boost the performance. F.Ex, I used Flatlists, only pass references and use PureComponents. Still, there is a lack while scrolling in the main page in Android. IOS is fine. Why is this? The reason for that is the implementation of `Flatlist` which is a javascript-based implementation of a Scrollview on Android and iOS. If you ever got in touch with Android development you will know that there is a special way of implementation for lists called `RecylerView`. If you want the take benefits of that you should either implement it natively and write your own bridge or use an existing one, both ways lead to more work.

You always have to balance the input you want to give and the output you can expect and in this case it wasn't that bad to think of performance improvements in that manner. To sum it up, the performance highly depends on your coding style and experience, but in the end, native makes a difference as it comes to speed and look and feel. Wow, what a nice transition the next section ;-)

#### Look-And-Feel

There exists a myth that cross-platform feels like hell to use and everybody notices it. That's true....NOT! Same as in the last section you just have to put more effort in development. That means more separate design for Android and iOS, separate navigation and separate components. Do you want to do that? No, defenitely not. That would ruin you time calculation and the main benefit of cross-platform. Therefore you should decide wisely. In this project I didn't care that much if it feels "like native" to save time, so I didn't customized the navigation or added an floating button for Android. But I could. That's the point. Coming from web development, bungle some tutorials and bloaded modules togheter and then complain about Look-And-Feel is just lazy and nothing more. You should start thinking differently if it comes to react-native, through away the opinions of unexperienced and lazy people and make your own experiences.

#### Fun

The reason why I'm doing this in general is fun. I enjoy coding in javascript (especially in es6/7) and like the react component pattern. Another thing is that I can support both, Android and iOS. I can also only support one of them and don't have to switch between java and swift/obj-C all the time. As it comes to network request or basic object/array modifications, there are tons of frameworks and toolkits to use for javascript. Network requests actually make fun! Can you imagine that? Great, I know :D From time to time I think "man, it would be great to do this in a storyboard", but the nice thing is, I could. To sum it up, it's fun to code in the react pattern with javascript.

### Drawbacks

As you can in the packages I used for this project, you see that I used a UI Framework/Collection to improve my development speed. For the MovieBrowser I chose `Shoutem`. `Shoutem` promotes that they can do almost concering mobile apps. I was only interested in the UI part which let you build react-native app "in not time", as they say on their website. If you ask me, do it by yourself. For prototyping it's fine, you get a nice looking app in short time. But then you need to customize. You need to go through a documentation and you recognize, the style is separated from the view. That remembers me of html and css separation. I'm not sure what I should think about it. For me at least, it's strange, I just don't like it. I'm sure a lot of you like those frameworks (shoutem, native base ...), but in my opinion it's another way for lazy people build nice looking apps very fast, but have no idea what they are doing or what's happening.

Another issue that hunts me since my first moment with react-native is the framework itself. It's still not `1.0`, so breaking changes are possible with each minor version. You often run into problems with lead to an upgrade of the react-native version. Sometimes it is working, but more often the projects are broken. I hate it, spend time to fix something that was already working and now broken because I wanted to fix something else. It's a bit exhausting. And the fact that it's never gonna stop because Android and iOS is constantly improving and updating, makes me feel a bit irated.

### Conclusion

I did a movie browser which gets the information from TMDB with a cross-platform framework called react-native. I enjoy coding in javascript and get native apps and the massive amount of node packages which can be used. Cross-platform has it benefits and drawback, but it highly depends on the usecase. My giveaways are the following: Read the docs precisely, write your own code, use less than more modules/frameworks and go through the whole project in mind beforehand to decide if native or cross-platform is the one to go for.

### Screenshots

To get a overview of the app and how it works I did some fancy store-like screenshots:

#### iOS

<table>
  <tr>
    <td><a href="url"><img src="https://github.com/papsti7/MovieBrowserApp/blob/develop/Screenshots/ios/0.jpg" align="center" height="760" width="448" ></a></td>
    <td>
    <a href="url"><img src="https://github.com/papsti7/MovieBrowserApp/blob/develop/Screenshots/ios/1.jpg" align="center" height="760" width="448" ></a>
    </td>
  </tr>
    <tr>
    <td><a href="url"><img src="https://github.com/papsti7/MovieBrowserApp/blob/develop/Screenshots/ios/2.jpg" align="center" height="760" width="448" ></a></td>
    <td>
    <a href="url"><img src="https://github.com/papsti7/MovieBrowserApp/blob/develop/Screenshots/ios/3.jpg" align="center" height="760" width="448" ></a>
    </td>
  </tr>
  
  </table>

#### Android

<table>
  <tr>
    <td><a href="url"><img src="https://github.com/papsti7/MovieBrowserApp/blob/develop/Screenshots/android/0.jpg" align="center" height="760" width="448" ></a></td>
    <td>
    <a href="url"><img src="https://github.com/papsti7/MovieBrowserApp/blob/develop/Screenshots/android/1.jpg" align="center" height="760" width="448" ></a>
    </td>
  </tr>
    <tr>
    <td><a href="url"><img src="https://github.com/papsti7/MovieBrowserApp/blob/develop/Screenshots/android/2.jpg" align="center" height="760" width="448" ></a></td>
    <td>
    <a href="url"><img src="https://github.com/papsti7/MovieBrowserApp/blob/develop/Screenshots/android/3.jpg" align="center" height="760" width="448" ></a>
    </td>
  </tr>
    
  </table>
