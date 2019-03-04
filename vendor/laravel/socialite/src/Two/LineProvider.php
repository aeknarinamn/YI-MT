<?php
  
namespace Laravel\Socialite\Two;
  
use Exception;
use Illuminate\Support\Arr;
// use YellowProject\LineUserProfile;
  
class LineProvider extends AbstractProvider implements ProviderInterface
{
    /**
     * The scopes being requested.
     *
     * @var array
     */
    protected $scopes = [];
  
    /**
     * {@inheritdoc}
     */
    protected function getAuthUrl($state)
    {
        // dd($this->buildAuthUrlFromBase('https://access.line.me/dialog/oauth/weblogin', $state));
        // dd($state);
        return $this->buildAuthUrlFromBase('https://access.line.me/oauth2/v2.1/authorize', $state);
    }
  
    /**
     * {@inheritdoc}
     */
    protected function getTokenFields($code)
    {
        // dd($code);
        if($code == null){
            abort(500);
        }else{
            return [
                'grant_type' => 'authorization_code',
                'client_id' => $this->clientId,
                'client_secret' => $this->clientSecret,
                'code' => $code,
                'redirect_uri' => $this->redirectUrl,
            ];
        }
        
    }
  
    /**
     * {@inheritdoc}
     */
    protected function getTokenUrl()
    {
        return 'https://api.line.me/oauth2/v2.1/token';
    }
  
    /**
     * {@inheritdoc}
     */
    protected function getUserByToken($token)
    {
        $userUrl = 'https://api.line.me/v2/profile';
  
        $response = $this->getHttpClient()->get(
            $userUrl, $this->getRequestOptions($token)
        );

        //dd($response);
  
        $user = json_decode($response->getBody(), true);
  
        return $user;
    }
  
    /**
     * {@inheritdoc}
     */
    protected function mapUserToObject(array $user)
    {
        //dd($user);
        return (new User)->setRaw($user)->map([
            'id' => $user['userId'],
            'name' => array_key_exists('displayName', $user)? $user['displayName'] : null,
            // 'nickname' => $user['displayName'],
            // 'email' => null,
            'avatar' => array_key_exists('pictureUrl', $user)? $user['pictureUrl'] : null,
            // 'avatar_original' => $user['pictureUrl'],
        ]);
    }
  
    /**
     * Get the default options for an HTTP request.
     *
     * @return array
     */
    protected function getRequestOptions($token)
    {
        return [
            'headers' => [
                'Authorization' => 'Bearer '.$token,
            ],
        ];
    }
}