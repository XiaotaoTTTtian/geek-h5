// generic tool types
type ApiResponse<Data> = {
  message: string
  data: Data
}
// login
export type Token = {
  token: string
  refresh_token: string
}
export type LoginResponse = ApiResponse<Token>
// no inductive refresh token
export type RefreshTokenResponse = ApiResponse<{ token: string }>
// personal information
export type User = {
  id: string
  name: string
  photo: string
  art_count: number
  follow_count: number
  fans_count: number
  like_count: number
}
export type UserResponse = ApiResponse<User>
// subscriber data
export type UserProfile = {
  id: string
  photo: string
  name: string
  mobile: string
  gender: number
  birthday: string
  intro: string
}
export type UserProfileResponse = ApiResponse<UserProfile>
// modify the picture
export type UserPhotoResponse = ApiResponse<{ photo: string }>
// channel lit data type
export type Channel = {
  id: number
  name: string
}
export type Channels = {
  channels: Channel[]
}
export type ChannelResponse = ApiResponse<Channels>
// article list data type
export type Articles = {
  pre_timestamp: string
  results: {
    art_id: string
    aut_id: string
    aut_name: string
    comm_count: number
    cover: {
      type: number
      images: string[]
    }
    pubdate: string
    title: string
  }[]
}
export type ArticlesResponse = ApiResponse<Articles>

export type SearchSuggestion = {
  options: string[]
}
export type SearchSuggestionResponse = ApiResponse<SearchSuggestion>

// search result
export type SearchResult = {
  page: number
  per_page: number
  total_count: number
  results: Articles['results']
}
export type SearchResultResponse = ApiResponse<SearchResult>
// article details data type
export type ArticleDetail = {
  art_id: string
  title: string
  pubdate: string
  aut_id: string
  aut_name: string
  aut_photo: string
  is_followed: boolean
  attitude: number
  content: string
  is_collected: boolean
  // 接口中缺失
  comm_count: number
  like_count: number
  read_count: number
}
export type ArticleDetailResponse = ApiResponse<ArticleDetail>
// the type the comment item
export type ArtComment = {
  com_id: string
  aut_id: string
  aut_name: string
  aut_photo: string
  like_count: number
  reply_count: number
  pubdate: string
  content: string
  is_liking: boolean
  is_followed: boolean
}
// type of article comment
export type ArticleComment = {
  total_count: number
  end_id: string | null
  last_id: string | null
  results: ArtComment[]
}
export type ArticleCommentResponse = ApiResponse<ArticleComment>
// the type of comments on an article
type AddArticleComment = {
  // id of the new comment
  com_id: string
  // who was commented on, and in the case of the article, the id of the article
  target: string
  // article id
  new_obj: ArtComment
}
export type AddArticleCommentResponse = ApiResponse<AddArticleComment>
//the type of comments on an article
type AddArticleComment = {
  // id of the new comment
  com_id: string
  // who is commenting on, and in the case of anarticle, the id of the article
  target: string
  // article id
  new_obj: ArtComment
}
// respond to the comments
type AddCommentReply = AddArticleComment & {
  art_id: string
}
export type AddCommentReplyResponse = ApiResponse<AddCommentReply>
